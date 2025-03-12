import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';
import {categoryList, CatProp} from "../types";
import {useContext, useState} from "react";
import {Category} from "../contexts/CategoryContext";
import {CartStore} from "../contexts/CartContext";

function AppHeader() {
    const categories = useContext(Category);
    const [searchText, setSearchText] = useState("");
    const { cart } = useContext(CartStore);
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return(
        <header>
            <nav>
                <Link to="/">
                    <img src={require('../assets/images/site/Frame_8.gif')} alt="VABC Bookstore" height="auto"/>
                </Link>

                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={"Search by book,Title or Author..."}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <div className="social_icon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div className="social_icon">
                    <i className="fa-solid fa-bookmark"></i>
                    <Link to="/cart" className="cart-link">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <div className="cart-icon">
                        <span className="cart-badge">{totalQuantity}</span>
                    </div>
                    </Link>
                </div>
                <div className="social_icon">
                    <i className="fa-solid fa-user"></i>
                </div>

                <nav className="navbar">
                    <ul>
                        <li>
                            <div className="dropdown">
                                <button className="dropbtn">Categories<i className="fa-solid fa-caret-down"></i></button>
                                <div className="dropdown-content">
                                {/*<Link to="/categories">Bestsellers</Link>*/}
                                {/*<Link to="/categories">History</Link>*/}
                                {/*<Link to="/categories">Mystery</Link>*/}

                                    {
                                        categories.length > 0 && categories.map(category => {
                                            return <Link
                                                key={category.categoryId}
                                                to={`/categories/${category.name}`}
                                                onClick={() => localStorage.setItem('lastCat', category.name)}
                                            >
                                                {category.name}
                                            </Link>
                                        })
                                    }

                                </div>
                            </div>
                        </li>
                        <li><Link to="#">Home</Link></li>
                        <li><Link to="#">About Us</Link></li>
                        <li><Link to="#">Contact Us</Link></li>
                    </ul>
                </nav>
            </nav>
        </header>
    );
}
export default AppHeader;

