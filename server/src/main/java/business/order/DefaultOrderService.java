package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;
	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}

	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}

	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear()
			);
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate,
					cart,
					connection
			);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}
	}

	private long performPlaceOrderTransaction(
			String name, String address,
			String phone, String email,
			String ccNumber, Date date,
			ShoppingCart cart, Connection connection
	) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email, ccNumber, date
			);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);

			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, item.getBookId(), customerOrderId, item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private int generateConfirmationNumber() {
		return ThreadLocalRandom.current().nextInt(999999999);
	}

	private Date getCardExpirationDate(String monthString, String yearString) {
		try {
			int month = Integer.parseInt(monthString);
			int year = Integer.parseInt(yearString);

			Calendar calendar = Calendar.getInstance();
			calendar.set(Calendar.MONTH, month - 1);
			calendar.set(Calendar.YEAR, year);

			int lastDayOfMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
			calendar.set(Calendar.DAY_OF_MONTH, lastDayOfMonth);

			return new Date(calendar.getTimeInMillis());
		} catch (NumberFormatException e) {
			throw new ApiException.ValidationFailure("Invalid date");
		}
	}

	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();
		if (name == null || name.isEmpty() || name.length() < 4 || name.length() > 45) {
			throw new ApiException.ValidationFailure("Invalid name field");
		}

		String address = customerForm.getAddress();
		if (address == null || address.isEmpty() || address.length() < 4 || address.length() > 45) {
			throw new ApiException.ValidationFailure("Invalid address field");
		}

		String phone = customerForm.getPhone();
		if (phone == null || phone.isBlank()) {
			throw new ApiException.ValidationFailure("Phone number missing");
		}

		phone = customerForm.getPhone().replaceAll("[\\s\\-()]", "");
		if (!phone.matches("\\d{10}")) {
			throw new ApiException.ValidationFailure("Invalid phone number");
		}

		// Email validation
		String email = customerForm.getEmail();
		if (email == null || email.isBlank()) {
			throw new ApiException.ValidationFailure("Missing email address");
		}

		if (email.contains(" ") || !email.contains("@") || email.endsWith(".")) {
			throw new ApiException.ValidationFailure("Invalid email address");
		}

		// Credit card number validation
		String ccNumber = customerForm.getCcNumber();
		if (ccNumber == null || ccNumber.isBlank()) {
			throw new ApiException.ValidationFailure("Missing credit card number");
		}

		ccNumber = customerForm.getCcNumber().replaceAll("\\s|-", "");
		if (ccNumber.length() < 14 || ccNumber.length() > 16) {
			throw new ApiException.ValidationFailure("Invalid credit card number");
		}

		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Please enter a valid expiration date.");
		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {
		try {
			YearMonth expiryDate = YearMonth.of(Integer.parseInt(ccExpiryYear), Integer.parseInt(ccExpiryMonth));
			YearMonth currentDate = YearMonth.now();
			return expiryDate.isBefore(currentDate);
		} catch (NumberFormatException | DateTimeException e) {
			return true;
		}
	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 0 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}

			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (databaseBook == null) {
				throw new ApiException.ValidationFailure("Book not found with ID: " + item.getBookId());
			}

			if (item.getBookForm().getPrice() != databaseBook.price()) {
				throw new ApiException.ValidationFailure("Price mismatch for book with ID: " + item.getBookId());
			}

			if (item.getBookForm().getCategoryId() != databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure("Category mismatch for book with ID: " + item.getBookId());
			}
		});
	}
}
