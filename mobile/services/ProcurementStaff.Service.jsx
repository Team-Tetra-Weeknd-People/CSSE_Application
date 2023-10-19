import axios from "axios";
import * as url from './constants/url.jsx'

export const register = async (data) => {
    return await axios.post(url.procurementStaff, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const login = async (data) => {
    return await axios.post(url.procurementStaffAuth, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getAllProcurementStaff = async () => {
    return await axios.get(url.procurementStaff, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOneProcurementStaff = async (id) => {
    return await axios.get(url.procurementStaffID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const updateProcurementStaff = async (id, data) => {
    return await axios.put(url.procurementStaffID(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteProcurementStaff = async (id) => {
    return await axios.delete(url.procurementStaffID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    register,
    login,
    getAllProcurementStaff,
    getOneProcurementStaff,
    updateProcurementStaff,
    deleteProcurementStaff,
}