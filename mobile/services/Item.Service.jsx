import axios from "axios";
import * as url from './constants/url.jsx'

export const getAllItem = async () => {
    return await axios.get(url.item, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOneItem = async (id) => {
    return await axios.get(url.itemGetOne(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getItemCatalogue = async (id) => {
    return await axios.get(url.itemCatalogue(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getItemSupplier = async (id) => {
    return await axios.get(url.itemSupplier(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const createItem = async (data) => {
    return await axios.post(url.item, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const updateItem = async (id, data) => {
    return await axios.put(url.itemID(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteItem = async (id) => {
    return await axios.delete(url.itemID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    getAllItem,
    getOneItem,
    getItemCatalogue,
    getItemSupplier,
    createItem,
    updateItem,
    deleteItem,
}