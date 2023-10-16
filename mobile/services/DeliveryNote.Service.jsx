import axios from "axios";
import * as url from './constants/url.jsx'

export const getAllDeliveryNote = async () => {
    return await axios.get(url.deliveryNote, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getOneDeliveryNote = async (id) => {
    return await axios.get(url.deliveryNoteGetOne(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const getDeliveryNoteOrder = async (id) => {
    return await axios.get(url.deliveryNoteOrder(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const createDeliveryNote = async (data) => {
    return await axios.post(url.deliveryNote, data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const updateDeliveryNote = async (id, data) => {
    return await axios.put(url.deliveryNoteID(id), data, {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export const deleteDeliveryNote = async (id) => {
    return await axios.delete(url.deliveryNoteID(id), {
        headers: {
            "Content-Type": "application/json"
        },
    });
}

export default {
    getAllDeliveryNote,
    getOneDeliveryNote,
    getDeliveryNoteOrder,
    createDeliveryNote,
    updateDeliveryNote,
    deleteDeliveryNote,
}

