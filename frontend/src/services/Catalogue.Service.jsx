import axios from "axios";
import * as url from './constants/url.jsx'

export const getAllCatalogue = async () => {
    return await axios.get(url.catalogue, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOneCatalogue = async (id) => {
    return await axios.get(url.catalogueGetOne(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getCatalogueSupplier = async (id) => {
    return await axios.get(url.catalogueSupplier(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const createCatalogue = async (data) => {
    return await axios.post(url.catalogue, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}


export const updateCatalogue = async (id, data) => {
    return await axios.put(url.catalogueID(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteCatalogue = async (id) => {
    return await axios.delete(url.catalogueID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    getAllCatalogue,
    getOneCatalogue,
    getCatalogueSupplier,
    createCatalogue,
    updateCatalogue,
    deleteCatalogue,
}