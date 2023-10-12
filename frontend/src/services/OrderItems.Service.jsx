import axios from "axios";
import * as url from './constants/url.jsx'

export const getOrderItems = async () => {
    return await axios.get(url.orderItem, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const createOrderItem = async (data) => {
    return await axios.post(url.orderItem, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteOrderItem = async (id) => {
    return await axios.delete(url.orderItemID.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    getOrderItems,
    createOrderItem,
    deleteOrderItem,
}

