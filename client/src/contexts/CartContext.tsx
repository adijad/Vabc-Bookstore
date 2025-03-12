// import { BookItem, ShoppingCartItem } from "../types";
// import React, { createContext, Dispatch, useReducer } from "react";
// import { cartReducer } from "../reducers/CartReducer";
//
// const initialCartState: ShoppingCartItem[] = [];
//
// type AppActions = {
//     id: number;
//     type: 'ADD' | 'REMOVE' | 'CLEAR';
//     item: BookItem;
// }
//
// export const CartStore = createContext<{
//     cart: ShoppingCartItem[];
//     dispatch: Dispatch<any>;
// }>({
//     cart: initialCartState,
//     dispatch: () => null
// });
//
// CartStore.displayName = 'CartContext';
//
// interface CartContextProps {
//     children: React.ReactNode;
// }
//
// function CartContext({ children }: CartContextProps) {
//     const [cartState, dispatch] = useReducer(
//         cartReducer as (state: ShoppingCartItem[], action: AppActions) => ShoppingCartItem[],
//         initialCartState
//     );
//
//     return (
//         <CartStore.Provider value={{ cart: cartState, dispatch }}>{children}</CartStore.Provider>
//     );
// }
//
// export default CartContext;


import { BookItem, ShoppingCartItem } from "../types";
import React, { createContext, Dispatch, useReducer, useEffect } from "react";
import { cartReducer } from "../reducers/CartReducer";

const initialCartState: ShoppingCartItem[] = [];
const storageKey = 'cart';


type AppActions = {
    id: number;
    type: 'ADD' | 'REMOVE' | 'CLEAR' | 'DECREASE' | 'INCREASE';
    item: BookItem;
}

export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

interface CartContextProps {
    children: React.ReactNode;
}

function CartContext({ children }: CartContextProps) {
    const [cartState, dispatch] = useReducer(
        cartReducer as (state: ShoppingCartItem[], action: AppActions) => ShoppingCartItem[],
        initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },
    );

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(cartState));
    }, [cartState]);

    return (
        <CartStore.Provider value={{ cart: cartState, dispatch }}>{children}</CartStore.Provider>
    );
}

export default CartContext;