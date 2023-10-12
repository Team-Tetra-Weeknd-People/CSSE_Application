import axios from "axios";
import * as url from './constants/url.jsx'

export const getAllCatelogue = async () => {
    return await axios.get(url.catelogue, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOneCatelogue = async (id) => {
    return await axios.get(url.catelogueGetOne.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getCatelogueSupplier = async (id) => {
    return await axios.get(url.catelogueSupplier.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const createCatelogue = async (data) => {
    return await axios.post(url.catelogue, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}


export const updateCatelogue = async (id, data) => {
    return await axios.put(url.catelogueID.replace(':id', id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteCatelogue = async (id) => {
    return await axios.delete(url.catelogueID.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    getAllCatelogue,
    getOneCatelogue,
    getCatelogueSupplier,
    createCatelogue,
    updateCatelogue,
    deleteCatelogue,
}