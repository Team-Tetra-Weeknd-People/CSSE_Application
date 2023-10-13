import axios from "axios";
import * as url from './constants/url.jsx'

export const register = async (data) => {
    return await axios.post(url.siteManager, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const login = async (data) => {
    return await axios.post(url.siteManagerAuth, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getAllSiteManagers = async () => {
    return await axios.get(url.siteManager, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getSiteManager = async (id) => {
    return await axios.get(url.siteManagerID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const updateSiteManager = async (id, data) => {
    return await axios.put(url.siteManagerID(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteSiteManager = async (id) => {
    return await axios.delete(url.siteManagerID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    register,
    login,
    getAllSiteManagers,
    getSiteManager,
    updateSiteManager,
    deleteSiteManager,
}
