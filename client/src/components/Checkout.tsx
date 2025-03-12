import "../assets/css/Checkout.css"
import { isCreditCard, isMobilePhone, isvalidEmail } from '../utils';
import {BookItem, CustomerForm, months, OrderDetails, ShoppingCartItem, years} from "../types";
import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import api from "../services/api";
import { CartStore } from "../contexts/CartContext";

function Checkout() {
    const getBookImageUrl = function (book: BookItem): string {
        let filename = book.title.toLowerCase();
        filename = filename.replace(/ /g, "-");
        filename = filename.replace(/'/g, "");
        filename = filename + ".gif";
        try {
            return require('../assets/images/books/' + filename);
        } catch (_) {
            return require('../assets/images/books/harry-potter.gif');
        }
    };


    const decreaseQuantity = (id: number) => {
        const item = cart.find((cartItem) => cartItem.id === id);

        if (item && item.quantity > 1) {
            dispatch({type: 'DECREASE', id});
        } else {
            dispatch({type: 'REMOVE', id});
        }
    };

    /*
     * This will be used by the month and year expiration of a credit card
     *  NOTE: For example yearFrom(0) == <current_year>
    */
    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const {cart, dispatch} = useContext(CartStore);
    const navigate = useNavigate();
    const isCartEmpty = cart.length === 0;

    const cartTotalPrice = parseFloat(
        cart.reduce((acc, item) => acc + item.quantity * item.book.price, 0).toFixed(2)
    );

    const tax = (cartTotalPrice * 0.1).toFixed(2);
    const subTotal = cartTotalPrice + parseFloat(tax);
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccNumberError, setCCNumberError] = useState("");
    const [ccExpiryError, setCcExpiryError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        ccNumber: "",
        ccExpiryMonth: 1,
        ccExpiryYear: yearFrom(0)
    });

    const [checkoutStatus, setCheckoutStatus] = useState("");

    function isValidForm() {
        if (formData.name.length < 4 || formData.name.length > 45) {
            return false;
        }

        if (formData.address.length < 10 || formData.address.length > 100) {
            return false;
        }

        if (!isMobilePhone(formData.phone)) {
            return false;
        }

        if (!isvalidEmail(formData.email)) {
            return false;
        }

        if (!isCreditCard(formData.ccNumber)) {
            return false;
        }

        return true;
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.length < 4 || value.length > 45) {
                    setNameError("Invalid Name");
                } else {
                    setNameError("");
                }
                break;
            case 'address':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
                if (value.length < 5) {
                    setAddressError("Invalid Address");
                } else {
                    setAddressError("");
                }
                break;
            case 'phone':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

                if (!isMobilePhone(value)) {
                    setPhoneError("Invalid phone number.");
                } else {
                    setPhoneError("");
                }
                break;
            case 'email':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

                if (!isvalidEmail(value)) {
                    setEmailError("Invalid email address.");
                } else {
                    setEmailError("");
                }
                break;
            case 'ccNumber':
                setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

                if (!isCreditCard(value)) {
                    setCCNumberError("Invalid credit card number.");
                } else {
                    setCCNumberError("");
                }
                break;
            // case 'ccExpiryMonth':
            //     const enteredMonth = parseInt(value, 10);
            //     setFormData((prevFormData) => ({ ...prevFormData, [name]: enteredMonth }));
            //     // // const currentYear = new Date().getFullYear();
            //     // const currentMonth = new Date().getMonth() + 1; // Adding 1 because months are zero-indexed
            //     // if (
            //     //     !isNaN(enteredMonth) &&
            //     //     enteredMonth >= 1 &&
            //     //     enteredMonth <= 12 &&
            //     //     ((enteredMonth === currentMonth && parseInt(formData.ccExpiryYear.toString()) >= currentYear) ||
            //     //         enteredMonth > currentMonth)
            //     // ) {
            //     //
            //     //     setCCExpiryMonthError(null); // Reset month error
            //     // } else {
            //     //     // Show error for invalid month
            //     //     setCCExpiryMonthError('Invalid month');
            //     // }
            //     break;
            //
            // case 'ccExpiryYear':
            //     const enteredYear = parseInt(value, 10);
            //     setFormData((prevFormData) => ({ ...prevFormData, [name]: enteredYear }));
            //     // // // const currentYear = new Date().getFullYear();
            //     // // if (!isNaN(enteredYear) && enteredYear >= currentYear) {
            //     // //     setFormData((prevFormData) => ({ ...prevFormData, [name]: enteredYear }));
            //     // //     setCCExpiryYearError(null); // Reset year error
            //     // // } else {
            //     // //     // Show error for invalid year
            //     // //     setCCExpiryYearError('Invalid year');
            //     // // }
            //     break;
            case 'ccExpiryMonth':
            case 'ccExpiryYear':
                setFormData((prevFormData) => ({...prevFormData, [name]:parseInt(value,10)}));

                if(name === 'ccExpiryMonth' && formData.ccExpiryYear) {
                    const currentYear = new Date().getFullYear();
                    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
                    const selectedYear = formData.ccExpiryYear;
                    const selectedMonth = parseInt(value, 10);

                    if(selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
                        setCcExpiryError('The expiration date has already passed.');
                    } else {
                        setCcExpiryError('');
                    }
                }

                if(name === 'ccExpiryYear' && formData.ccExpiryMonth) {
                    const currentYear = new Date().getFullYear();
                    const currentMonth = new Date().getMonth() + 1;
                    const selectedYear = parseInt(value, 10);
                    const selectedMonth = formData.ccExpiryMonth;

                    if(selectedYear < currentYear || (selectedYear === currentYear && selectedMonth < currentMonth)) {
                        setCcExpiryError('The expiration date has already passed.');
                    } else {
                        setCcExpiryError('');
                    }
                }
                break;
            default:
                break;
        }
    }

    const placeOrder = async (customerForm: CustomerForm) => {
        const order = { customerForm, cart: { itemArray: cart } };

        const orders = JSON.stringify(order);
        const orderDetails: OrderDetails = await api.post('/orders', orders, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                dispatch({ type: CartTypes.CLEAR });
                return response.data;
            })
            .catch((error) => {
                console.error(error);
            });

        return orderDetails;
    }

    async function submitOrder(event: FormEvent) {
        event.preventDefault();

        const isFormCorrect= isValidForm();
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
        }

        const order = await placeOrder(formData);
        if (order) {
            setCheckoutStatus("PENDING");
        } else {
            setCheckoutStatus("ERROR");
        }
    }

    function formatCreditCardNumber(creditCardNumber: string) {
        const numericValue = creditCardNumber.replace(/\D/g, '');
        return numericValue.replace(/(\d{4})/g, '$1 ').trim();
    }

    return (
        <div className="checkout-table">
            <div className="checkout-cart-table-view">
                <div className="checkout-page-body">
                    <div>
                        {isCartEmpty ? (
                            <div className="empty-cart-logo">
                                <img src="../assets/images/site/empty-shopping-cart.png" alt="Empty Cart" />
                                <p>Your cart is empty!</p>
                            </div>
                    ) : (
                        <form
                            className="checkout-form"
                            onSubmit={submitOrder}
                        >
                            <div>
                                <label htmlFor="fname">Name:</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="name"
                                    id="fname"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder={"Enter your name.."}
                                />
                            </div>
                            <> {nameError && <div className="error"> {nameError}</div>}</>
                            <div>
                                <label htmlFor="address">Address:</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder={"Enter billing address.."}
                                />
                            </div>
                            <> {addressError && <div className="error"> {addressError}</div>}</>

                            <div>
                                <label htmlFor="phone">Phone:</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder={"Enter your phone number.."}
                                />
                            </div>
                            <> {phoneError && <div className="error"> {phoneError}</div>}</>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder={"Enter a valid email id.."}
                                />
                            </div>
                            <> {emailError && <div className="error"> {emailError}</div>}</>

                            <div>
                                <label htmlFor="ccNumber">Credit Card:</label>
                                <input
                                    type="text"
                                    size={16}
                                    name="ccNumber"
                                    id="ccNumber"
                                    placeholder="Enter your credit card number.."
                                    value={formatCreditCardNumber(formData.ccNumber)}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <> {ccNumberError && <div className="error"> {ccNumberError}</div>}</>

                            <div>
                                <label htmlFor="month">Expiration Date: </label>
                                <div className="expiry-container">
                                    <select
                                        id="month"
                                        name="ccExpiryMonth"
                                        value={formData.ccExpiryMonth}
                                        onChange={handleInputChange}
                                    >
                                        {months.map((month: string, i: number) => (
                                            <option key={i} value={i+1}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        name="ccExpiryYear"
                                        value={formData.ccExpiryYear}
                                        onChange={handleInputChange}
                                    >
                                        {years.map((year, i) => (
                                            <option key={i} value={yearFrom(year)}>
                                                {yearFrom(year)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <> {ccExpiryError && <div className="error-expiry">{ccExpiryError}</div>}</>
                            </div>



                        </form>
                    )}
                </div>

                <div className="order-total">
                    <div className="checkout-cart-summary-item">
                        <span className="checkout-cart-summary-title">Subtotal: </span>
                        <span className="checkout-cart-summary-value"> ${cartTotalPrice}</span>
                    </div>
                    <div className="checkout-cart-summary-item tax">
                        <span className="checkout-cart-summary-title">Tax: </span>
                        <span className="checkout-cart-summary-value"> ${tax}</span>
                    </div>
                    <div className="checkout-cart-summary-item total">
                        <span className="checkout-cart-summary-title">Total: </span>
                        <span className="checkout-cart-summary-value"> ${subTotal}</span>
                    </div>
                    {/* TO DO: Add Complete Purchase button */}
                    <button className="complete-purchase-button" onClick={submitOrder}>
                        Complete Purchase
                    </button>

                </div>

                <div>
                    {/*The following code displays different string based on the */}
                    {/*value of the checkoutStatus*/}
                    {/*Note the ternary operator*/}
                    {
                        checkoutStatus !== '' ?
                            <>
                                <section className="checkoutStatusBox">
                                    {(checkoutStatus === 'ERROR') ?
                                        <div>
                                            Error: Please fix the problems above and try again.
                                        </div> : (checkoutStatus === 'PENDING' ?
                                            <div>
                                                Processing...
                                            </div> : (checkoutStatus === 'OK' ?
                                                <div>
                                                    Order placed...
                                                </div> :
                                                <div>
                                                    An unexpected error occurred, please try again.
                                                </div>))}
                                </section>
                            </>
                            : <></>}
                </div>
            </div>

            <div>
                {/*This displays the information about the items in the cart*/}
                <ul className="checkout-cart-info">
                    {
                        cart?.map((item: ShoppingCartItem, i: number) => (
                            <div key={i} className="checkout-cart-book-item">
                                <div className="checkout-cart-book-image" key={i}>
                                    <img src={getBookImageUrl(item.book)} alt="title" className ="checkout-cart-info-img"
                                    />
                                </div>

                                <div className="checkout-cart-book-info">
                                    <div className="checkout-cart-book-title">{item.book.title} </div>
                                    <div className="checkout-cart-book-author">{item.book.author}</div>
                                    <div className="checkout-cart-book-subtotal">
                                        ${(item.book.price * item.quantity).toFixed(2)}
                                    </div>
                                    <div className="checkout-cart-book-quantity">
                                        <button className="checkout-icon-button dec-button"
                                                onClick={() => decreaseQuantity(item.id)}>
                                            <FontAwesomeIcon icon={faMinusCircle}/>
                                        </button>
                                        <button className="checkout-num-button">{item.quantity}</button>
                                        <button className="checkout-icon-button inc-button" onClick={() => {
                                            dispatch({type: CartTypes.ADD, book: item.book, id: item.id});
                                        }}>
                                            <i><FontAwesomeIcon icon={faPlusCircle}/></i>
                                        </button>


                                    </div>
                                </div>

                            </div>
                        ))}
                </ul>
            </div>
        </div>
        </div>
    )
}

export default Checkout;