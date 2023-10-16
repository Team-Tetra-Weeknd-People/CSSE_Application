// add API enpoints here
const BASE_URL = 'https://csse-backend-b5wl.onrender.com/api';

export const adminAuth = `${BASE_URL}/admin/auth`;
export const admin = `${BASE_URL}/admin`;
export const adminID = (id) => `${BASE_URL}/admin/${id}`;

export const catalogue = `${BASE_URL}/catalogue/`;
export const catalogueID = (id) => `${BASE_URL}/catalogue/${id}`;
export const catalogueGetOne = (id) => `${BASE_URL}/catalogue/getOne/${id}`;
export const catalogueSupplier = (id) => `${BASE_URL}/catalogue/supplier/${id}`;

export const item = `${BASE_URL}/item`;
export const itemID = (id) => `${BASE_URL}/item/${id}`;
export const itemGetOne = (id) => `${BASE_URL}/item/getOne/${id}`;
export const itemCatalogue = (id) => `${BASE_URL}/item/catalogue/${id}`;
export const itemSupplier = (id) => `${BASE_URL}/item/supplier/${id}`;

export const managerAuth = `${BASE_URL}/manager/auth`;
export const manager = `${BASE_URL}/manager`;
export const managerID = (id) => `${BASE_URL}/manager/${id}`;

export const order = `${BASE_URL}/order/`;
export const orderID = (id) => `${BASE_URL}/order/${id}`;
export const orderGetOne = (id) => `${BASE_URL}/order/getOne/${id}`;
export const orderSiteManager = (id) => `${BASE_URL}/order/siteManager/${id}`;
export const orderStatusSupplier = (status, id) => `${BASE_URL}/order/status/${status}/supplier/${id}`;

export const procurementStaffAuth = `${BASE_URL}/procurementStaff/auth`;
export const procurementStaff = `${BASE_URL}/procurementStaff`;
export const procurementStaffID = (id) => `${BASE_URL}/procurementStaff/${id}`;

export const site = `${BASE_URL}/site`;
export const siteID = (id) => `${BASE_URL}/site/${id}`;
export const siteGetOne = (id) => `${BASE_URL}/site/getOne/${id}`;
export const siteSiteManager = (id) => `${BASE_URL}/site/siteManager/${id}`;

export const siteManagerAuth = `${BASE_URL}/siteManager/auth`;
export const siteManager = `${BASE_URL}/siteManager`;
export const siteManagerID = (id) => `${BASE_URL}/siteManager/${id}`;

export const supplierAuth = `${BASE_URL}/supplier/auth`;
export const supplier = `${BASE_URL}/supplier`;
export const supplierID = (id) => `${BASE_URL}/supplier/${id}`;

export const deliveryNote = `${BASE_URL}/deliveryNote`;
export const deliveryNoteID = (id) => `${BASE_URL}/deliveryNote/${id}`;
export const deliveryNoteGetOne = (id) => `${BASE_URL}/deliveryNote/getOne/${id}`;
export const deliveryNoteOrder = (id) => `${BASE_URL}/deliveryNote/order/${id}`;
