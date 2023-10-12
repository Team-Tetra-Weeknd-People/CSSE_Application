import axios from "axios";
import * as url from './constants/url.jsx'

export const register = async (data) => {
    return await axios.post(url.admin, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const login = async (data) => {
    return await axios.post(url.adminAuth, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getAllAdmins = async () => {
    return await axios.get(url.admin, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getAdmin = async (id) => {
    return await axios.get(url.adminID.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const updateAdmin = async (id, data) => {
    return await axios.put(url.adminID.replace(':id', id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteAdmin = async (id) => {
    return await axios.delete(url.adminID.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    register,
    login,
    getAllAdmins,
    getAdmin,
    updateAdmin,
    deleteAdmin,
}