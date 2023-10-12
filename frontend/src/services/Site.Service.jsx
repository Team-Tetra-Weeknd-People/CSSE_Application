import axios from "axios";
import * as url from './constants/url.jsx'

export const getAllSite = async () => {
    return await axios.get(url.site, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOneSite = async (id) => {
    return await axios.get(url.siteID.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getSiteByManager = async (id) => {
    return await axios.get(url.siteManager.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const createSite = async (data) => {
    return await axios.post(url.site, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const updateSite = async (id, data) => {
    return await axios.put(url.siteID.replace(':id', id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteSite = async (id) => {
    return await axios.delete(url.siteID.replace(':id', id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    getAllSite,
    getOneSite,
    getSiteByManager,
    createSite,
    updateSite,
    deleteSite,
}
