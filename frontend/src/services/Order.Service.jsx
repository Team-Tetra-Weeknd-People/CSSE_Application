import axios from "axios";
import * as url from './constants/url.jsx'

export const getAllOrder = async () => {
    return await axios.get(url.order, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOneOrder = async (id) => {
    return await axios.get(url.orderGetOne.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOrderSiteManager = async (id) => {
    return await axios.get(url.orderSiteManager.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const createOrder = async (data) => {
    return await axios.post(url.order, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const updateOrder = async (id, data) => {
    return await axios.put(url.orderID.replace(':id', id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteOrder = async (id) => {
    return await axios.delete(url.orderID.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    getAllOrder,
    getOneOrder,
    getOrderSiteManager,
    createOrder,
    updateOrder,
    deleteOrder,
}


