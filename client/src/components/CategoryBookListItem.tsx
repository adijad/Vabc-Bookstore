import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import { BookItem, BookList } from "../types";
import React, {useContext} from 'react';
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";

const bookImageFileName =  (book:BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};

function CategoryBookListItem({ bookList }: BookList) {
const { dispatch } = useContext(CartStore);
  function handleAddToCart(book: BookItem) {
    dispatch({
      type: CartTypes.ADD,
      item: book,
      id: book.bookId
    });
  }

return (
  <div className="categories_box">
      {bookList.map((book:BookItem) => (
          <div
              key={book.bookId}
              className="categories_card"
          >
            {/*${isHovered && book.isPublic ? 'hovered' : ''}*/}
            <div className="categories_image">
              <img
                  src={require('../assets/images/books/' + bookImageFileName(book))}
                  alt="Books"
              />
            </div>

            {book.isPublic ? (
                <p></p>
                ) : (
                <div className="read-now-icon">
                  <i className="fa-solid fa-book-open-reader"></i>
                </div>
            )}
            <div className="Info_about">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <h2>{"Available from $"}{book.price}</h2>
              <div className="social_icon1">
                <button onClick={() => handleAddToCart(book)}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
              <div className="social_icon2">
                <i className="fa-solid fa-heart"></i>
              </div>
            </div>
          </div>
      ))}
  </div>
)
}
export default CategoryBookListItem;
