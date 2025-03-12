import { OrderDetails } from "../types";
import {defaultOrderDetails} from "../contexts/OrderDetailContext";

export const OrderTypes = {
    ADD: 'ORDER_ADD',
    CLEAR: 'ORDER_CLEAR'
}

type OrderAction =
    | { type: 'ORDER_ADD'; payload: OrderDetails }
    | { type: 'ORDER_CLEAR'; };

export const orderDetailsReducer = (state: OrderDetails, action: OrderAction): OrderDetails => {
    switch (action.type) {
        case OrderTypes.ADD:
            if ("payload" in action) {
                return action.payload;
            }

            throw new Error("Payload not found in ORDER_ADD action");

        case OrderTypes.CLEAR:
            return defaultOrderDetails;

        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
}