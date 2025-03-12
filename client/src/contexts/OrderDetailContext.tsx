import React, {createContext, Dispatch, useReducer} from "react";
import { OrderDetails } from "../types";
import { orderDetailsReducer } from "../reducers/OrderDetailsReducer";

type Action =
    | { type: 'ORDER_ADD', payload: OrderDetails }
    | { type: 'ORDER_CLEAR' };

export const defaultOrderDetails: OrderDetails = {
    order: {
        orderId: 0,
        amount: 0,
        dateCreated: Date.now(),
        confirmationNumber: 0,
        customerId: 0,
    },
    customer: {
        customerName: '',
        address: '',
        phone: '',
        email: '',
        ccNumber: '',
        ccExpDate: Date.now()
    },
    books: [],
    lineItems: []
};

const initialState: OrderDetails = defaultOrderDetails;

interface OrderDetailsContextProps {
    orderDetails: OrderDetails;
    dispatch: Dispatch<Action>;
}

const defaultContextValue: OrderDetailsContextProps = {
    orderDetails: initialState,
    dispatch: () => {}
}

export const OrderDetailsStore = createContext<OrderDetailsContextProps>(defaultContextValue);
OrderDetailsStore.displayName = 'OrderDetailsContext';

interface OrderDetailsProviderProps {
    children: React.ReactNode;
}

function OrderDetailsContext({ children }: OrderDetailsProviderProps) {
    const [state, dispatch] = useReducer(orderDetailsReducer, initialState);

    return (
        <OrderDetailsStore.Provider value={{ orderDetails: state, dispatch }}>{children}</OrderDetailsStore.Provider>
    );
}

export default OrderDetailsContext;