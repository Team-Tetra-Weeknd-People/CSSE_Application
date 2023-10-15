import axios from "axios";
import * as url from './constants/url.jsx'

export const register = async (data) => {
    return await axios.post(url.supplier, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const login = async (data) => {
    return await axios.post(url.supplierAuth, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getAllSuppliers = async () => {
    return await axios.get(url.supplier, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getSupplier = async (id) => {
    return await axios.get(url.supplierID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const updateSupplier = async (id, data) => {
    return await axios.put(url.supplierID(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteSupplier = async (id) => {
    return await axios.delete(url.supplierID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    register,
    login,
    getAllSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier,
}
