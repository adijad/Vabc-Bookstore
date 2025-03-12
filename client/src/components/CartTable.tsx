// import  "../assets/css/CartTable.css"
// import { BookItem } from "../types";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
// import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight';
// import {faMinusCircle} from '@fortawesome/free-solid-svg-icons/faMinusCircle';
// import {faPlusCircle} from '@fortawesome/free-solid-svg-icons/faPlusCircle';
//
//
//     const getBookImageUrl = function (book: BookItem): string {
//         let filename = book.title.toLowerCase();
//         filename = filename.replace(/ /g, "-");
//         filename = filename.replace(/'/g, "");
//         filename = filename + ".gif";
//         try {
//             return require('../assets/images/books/' + filename);
//         } catch (_) {
//             return require('../assets/images/books/the-iliad.gif');
//         }
//     };
//  function CartTable()
//  {
//      return (
//
//     <div className="cart-table">
//         <ul className = "cart2">
//             <li className="table-heading">
//                 <div className="heading-book">Book</div>
//                 <div className="heading-price">Price / Quantity</div>
//                 <div className="heading-subtotal">Amount</div>
//             </li>
//     {/*        Book Title, unit price/quantity and total price for each item in the cart*/}
//     {/*        Note that the following simply display hardcoded data*/}
// <li>
//     <div className="cart-book-image">
//         <div className="rect narrow-rect"></div>
//     </div>
//     <div className="cart-book-title">Book Title</div>
//     <div className="cart-book-price">$2.99</div>
//     <div className="cart-book-quantity">
//
//         <button
//             className="icon-button inc-button"
//         >
//             <i className="fas fa-plus-circle"><FontAwesomeIcon icon={faPlusCircle} /></i>
//         </button>
//         <span className="quantity">2</span>&nbsp;
//         <button
//             className="icon-button dec-button"
//         >
//             <i className="fas fa-minus-circle">  <FontAwesomeIcon icon={faMinusCircle} /></i>
//         </button>
//     </div>
//     <div className="cart-book-subtotal">$3.98</div>
// </li>
// <li className="line-sep"></li>
// <li>
//     <div className="cart-book-image">
//         <img  className = "cart2" src={require('../assets/images/books/little-dorrit.gif')} alt="Dune" />
//     </div>
//     <div className="cart-book-title">Book Title</div>
//     <div className="cart-book-price">$2.99</div>
//     <div className="cart-book-quantity">
//         <button
//             className="icon-button dec-arrow-button"
//         >
//             <i className="fas fa-chevron-left">
//             <FontAwesomeIcon icon={faChevronLeft} /></i>
//         </button>
//         <span className="quantity">&nbsp;&nbsp;2&nbsp;&nbsp;</span>
//         <button
//             className="icon-button inc-arrow-button"
//         >
//
//             <i className="fas fa-chevron-right">  <FontAwesomeIcon icon={faChevronRight} /></i>
//         </button>
//     </div>
//     <div className="cart-book-subtotal">$3.98</div>
// </li>
// <li className="line-sep"></li>
// <li>
//     <div className="cart-book-image">
//         <div className="rect square"></div>
//     </div>
//     <div className="cart-book-title">
//         A Very Long Book Title That Goes On and On As Though the Author Were
//         Very Impressed with Themself
//     </div>
//     <div className="cart-book-price">$43.50</div>
//     <div className="cart-book-quantity">
//         <input type="number" value="12" min="0" max="20" />
//     </div>
//     <div className="cart-book-subtotal">$522.00</div>
// </li>
// <li className="line-sep"></li>
// <li>
//     <div className="cart-book-image">
//         <div className="rect wide-rect"></div>
//     </div>
//     <div className="cart-book-title">Book Title</div>
//     <div className="cart-book-price">$2.99</div>
//     <div className="cart-book-quantity">
//         <select id="quantity">
//             <option value="0">Qty: 0</option>
//             <option value="1">Qty: 1</option>
//             <option value="2">Qty: 2</option>
//             <option value="3">Qty: 3</option>
//             <option value="4">Qty: 4</option>
//             <option value="5">Qty: 5</option>
//             <option value="6">Qty: 6</option>
//             <option value="7">Qty: 7</option>
//             <option value="8">Qty: 8</option>
//             <option value="9">Qty: 9</option>
//             <option value="10">Qty: 10</option>
//         </select>
//     </div>
//     <div className="cart-book-subtotal">$3.98</div>
// </li>
// </ul>
// </div>
//  )
//  }
//
// export default CartTable;


// Second Try

// import "../assets/css/CartTable.css";
// import "../assets/css/AppFooter.css";
// import React, { useContext } from "react";
// import { CartStore } from "../contexts/CartContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// import {Link} from "react-router-dom";
// import { BookItem} from "../types";
//
// function CartTable() {
//     const { cart, dispatch } = useContext(CartStore);
//
//     const bookImageFileName = (bookId: number) => `${bookId}.jpeg`;
//
//     const removeFromCart = (id: number) => {
//         dispatch({ type: 'REMOVE', id });
//     };
//
//     const clearCart = () => {
//         dispatch({ type: 'CLEAR' });
//     };
//
//     const decreaseQuantity = (id: number) => {
//         const item = cart.find((cartItem) => cartItem.id === id);
//
//         if (item && item.quantity > 1) {
//             dispatch({ type: 'DECREASE', id });
//         } else {
//             dispatch({ type: 'REMOVE', id });
//         }
//     };
//
//     const increaseQuantity = (id: number) => {
//         dispatch({ type: 'INCREASE', id });
//     };
//
//     const getItemCountText = () => {
//         const itemCount = cart.length;
//         if (itemCount === 0) return "Your cart is empty";
//         if (itemCount === 1) return "1 book";
//         return `${itemCount} books`;
//     };
//
//     return (
//         <div className="cart-table">
//             <div className="cart-header">
//                 <h2>BOOKSTORE</h2>
//                 <span>{getItemCountText()}</span>
//                 {cart.length > 0 && (
//                     <button onClick={clearCart} className="clear-cart">
//                         Clear Cart
//                     </button>
//                 )}
//             </div>
//             {cart.length > 0 ? (
//                 <React.Fragment>
//                     <div className="cart-items">
//                         <div className="cart-item cart-item-heading">
//                             <div className="cart-book-image">Cover</div>
//                             <div className="cart-book-title">Title</div>
//                             <div className="cart-book-price">Unit Price</div>
//                             <div className="cart-book-quantity">Quantity</div>
//                             <div className="cart-book-subtotal">Subtotal</div>
//                             <div className="cart-book-remove">Remove</div>
//                         </div>
//                         {cart.map((cartItem) => (
//                             <div className="cart-item" key={cartItem.id}>
//                                 <div className="cart-book-image">
//                                     <img src={require(`../assets/images/books/${bookImageFileName(cartItem.id)}`)} alt={cartItem.book.title} />
//                                 </div>
//                                 <div className="cart-book-title">{cartItem.book.title}</div>
//                                 <div className="cart-book-price">${cartItem.book.price.toFixed(2)}</div>
//                                 <div className="cart-book-quantity">
//                                     <button className="icon-button" onClick={() => decreaseQuantity(cartItem.id)}>
//                                         <FontAwesomeIcon icon={faMinusCircle} />
//                                     </button>
//                                     <span>{cartItem.quantity}</span>
//                                     <button className="icon-button" onClick={() => increaseQuantity(cartItem.id)}>
//                                         <FontAwesomeIcon icon={faPlusCircle} />
//                                     </button>
//                                 </div>
//                                 <div className="cart-book-subtotal">
//                                     ${ (cartItem.book.price * cartItem.quantity).toFixed(2) }
//                                 </div>
//                                 <div className="cart-book-remove">
//                                     <button className="icon-button" onClick={() => removeFromCart(cartItem.id)}>x</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="footer">
//
//                         <div className="cart-subtotal">
//                             <span>Sub-total:</span>
//                             <span>${cart.reduce((acc, item) => acc + (item.quantity * item.book.price), 0).toFixed(2)}</span>
//                         </div>
//
//                         <div className="cart-actions">
//                             <Link to="/categories/History" className="button continue-shopping">Continue Shopping</Link>
//                             <Link to="/checkout" className="button checkout">Proceed to Checkout</Link>
//                         </div>
//                     </div>
//                 </React.Fragment>
//             ) : (
//                 <div className="cart-empty-message">
//                     <p>Your cart is empty. <Link to="/categories/History">Start shopping</Link>.</p>
//                 </div>
//             )}
//         </div>
//     );
// }
//
//
// export default CartTable;



// Third try

import "../assets/css/CartTable.css";
import React, { useContext } from "react";
import { CartStore } from '../contexts/CartContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {BookItem} from "../types";

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
}

function CartTable() {
    const navigate = useNavigate();
    const { cart, dispatch } = useContext(CartStore);
    const totalCost = cart.reduce((acc, currentItem) => acc + (currentItem.quantity * currentItem.book.price), 0);

    const removeFromCart = (id: number) => {
        dispatch({ type: 'REMOVE', id });
    };

    const handleIncreaseQuantity = (id: number) =>{
        dispatch({ type: CartTypes.INCREASE, id:id });
    };

    const handleDecreaseQuantity = (id: number) => {
        const item = cart.find((cartItem) => cartItem.id === id);

        if (item && item.quantity > 1) {
            dispatch({ type: 'DECREASE', id });
        } else {
            dispatch({ type: 'REMOVE', id });
        }
    };


    const clearCart = () => {
        dispatch({ type: CartTypes.CLEAR });
    };


    // const getItemCountText = () => {
    //     const itemCount = cart.length;
    //     if (itemCount === 0) return "Your cart is empty";
    //     if (itemCount === 1) return "1 book";
    //     return `${itemCount} books`;
    // };

    const getItemCountText = () => {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

        if (itemCount === 0) return "Your cart is empty";
        if (itemCount === 1) return "1 book";

        return `${itemCount} books`;
    };

    return (
        <div className="cart-table">
            <div className="cart-header">
                <h2></h2>
                <span>{getItemCountText()}</span>
                {cart.length > 0 && (
                    <button onClick={clearCart} className="clear-cart">
                        Clear Cart
                    </button>
                )}
            </div>
            {cart.length > 0 ? (
                <React.Fragment>
                    <div className="cart-items">
                        <div className="cart-item cart-item-heading">
                            <div className="cart-book-image">Cover</div>
                            <div className="cart-book-title">Title</div>
                            <div className="cart-book-price">Unit Price</div>
                            <div className="cart-book-quantity">Quantity</div>
                            <div className="cart-book-subtotal">Subtotal</div>
                            <div className="cart-book-remove">Remove</div>
                        </div>
                        {cart.map((cartItem) => (
                            <div className="cart-item" key={cartItem.id}>
                                <div className="cart-book-image">
                                    <img src={getBookImageUrl(cartItem.book)} alt="book" />
                                </div>
                                <div className="cart-book-title">{cartItem.book.title}</div>
                                <div className="cart-book-price">${cartItem.book.price}</div>
                                <div className="cart-book-quantity">
                                    <button className="icon-button" onClick={() => handleDecreaseQuantity(cartItem.id)}>
                                        <FontAwesomeIcon icon={faMinusCircle} />
                                    </button>
                                    <span>{cartItem.quantity}</span>
                                    <button className="icon-button" onClick={() => handleIncreaseQuantity(cartItem.id)}>
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                    </button>
                                </div>
                                <div className="cart-book-subtotal">
                                    ${cartItem.quantity * cartItem.book.price}
                                </div>
                                <div className="cart-book-remove">
                                    <button className="icon-button" onClick={() => removeFromCart(cartItem.id)}>x</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-footer">
                        <div className="cart-subtotal">
                            <span>Total Cost:</span>
                            <span>${totalCost}</span>
                        </div>

                        <div className="cart-actions">
                            <button onClick={() => navigate(`/categories/${localStorage.getItem('lastCat')}`)} className="button continue-shopping">Continue Shopping</button>
                            <Link to="/checkout" className="button checkout">Proceed to Checkout</Link>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <div className="cart-empty-message">
                    <p>Check your Saved for later items or <Link to="/categories/Fantasy">Start shopping</Link>.</p>
                </div>
            )}
        </div>
    );
}


export default CartTable;