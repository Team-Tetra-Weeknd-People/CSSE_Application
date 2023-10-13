import axios from "axios";
import * as url from './constants/url.jsx'

export const register = async (data) => {
    return await axios.post(url.manager, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const login = async (data) => {
    return await axios.post(url.managerAuth, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getAllManager = async () => {
    return await axios.get(url.manager, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOneManager = async (id) => {
    return await axios.get(url.managerID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const updateManager = async (id, data) => {
    return await axios.put(url.managerID(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteManager = async (id) => {
    return await axios.delete(url.managerID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    register,
    login,
    getAllManager,
    getOneManager,
    updateManager,
    deleteManager,
}

