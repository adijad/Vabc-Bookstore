import React from "react";
import CartTable from "./CartTable";
import "../assets/css/Cart.css"; // Fix the import path here

function Cart() {
    return (
        // <div >
        <div className="Cart_heading"><h1>My Cart</h1>
        <CartTable />
        </div>
    );
}

export default Cart;