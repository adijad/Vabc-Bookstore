import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, {useContext, useEffect} from 'react';
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import {Category} from "./contexts/CategoryContext";
import Confirmation from "./components/Confirmation";

function App() {
    const categories = useContext(Category);
    const lastCat = localStorage.getItem('lastCat');

    useEffect(() => {
        if (!lastCat) {
            localStorage.setItem('lastCat', categories.length > 0 ? categories[0].name : "History");
        }
    }, [categories, lastCat]);

    return (
        <Router basename ={"/AdityaBookstoreReactTransact"}>
            <AppHeader />
            <Routes>home
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<CategoryBookList />}>
                    <Route path=":id" element={<CategoryBookList />} />
                </Route>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
            <AppFooter />
        </Router>
  );
}

export default App;

