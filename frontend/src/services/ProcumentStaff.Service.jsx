import axios from "axios";
import * as url from './constants/url.jsx'

export const register = async (data) => {
    return await axios.post(url.procumentStaff, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const login = async (data) => {
    return await axios.post(url.procumentStaffAuth, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getAllProcumentStaff = async () => {
    return await axios.get(url.procumentStaff, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOneProcumentStaff = async (id) => {
    return await axios.get(url.procumentStaffID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const updateProcumentStaff = async (id, data) => {
    return await axios.put(url.procumentStaffID(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteProcumentStaff = async (id) => {
    return await axios.delete(url.procumentStaffID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    register,
    login,
    getAllProcumentStaff,
    getOneProcumentStaff,
    updateProcumentStaff,
    deleteProcumentStaff,
}