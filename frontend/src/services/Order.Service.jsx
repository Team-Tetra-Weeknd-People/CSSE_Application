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
    return await axios.get(url.orderGetOne(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOrderSiteManager = async (id) => {
    return await axios.get(url.orderSiteManager(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOrderStatusSupplier = async (status, id) => {
    console.log(url.orderStatusSupplier(status, id))
    return await axios.get(url.orderStatusSupplier(status, id), {
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
    return await axios.put(url.orderID(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}
export const emailForInvoice = async (data) => {
    return await axios.post(url.emailForInvoice, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteOrder = async (id) => {
    return await axios.delete(url.orderID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    getAllOrder,
    getOneOrder,
    getOrderSiteManager,
    getOrderStatusSupplier,
    createOrder,
    updateOrder,
    deleteOrder,
    emailForInvoice
}


