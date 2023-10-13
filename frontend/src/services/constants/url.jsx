// add API enpoints here
const BASE_URL = 'http://localhost:8080/api';

export const adminAuth = `${BASE_URL}/admin/auth`;
export const admin = `${BASE_URL}/admin`;
export const adminID = (id) => `${BASE_URL}/admin/${id}`;

export const catalogue = `${BASE_URL}/catalogue`;
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

export const order = `${BASE_URL}/order`;
export const orderID = (id) => `${BASE_URL}/order/${id}`;
export const orderGetOne = (id) => `${BASE_URL}/order/getOne/${id}`;
export const orderSiteManager = (id) => `${BASE_URL}/order/siteManager/${id}`;

export const procumentStaffAuth = `${BASE_URL}/procumentStaff/auth`;
export const procumentStaff = `${BASE_URL}/procumentStaff`;
export const procumentStaffID = (id) => `${BASE_URL}/procumentStaff/${id}`;

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

