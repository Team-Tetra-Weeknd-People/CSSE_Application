// add API enpoints here
const BASE_URL = 'http://localhost:8080/api';

export const adminAuth = `${BASE_URL}/admin/auth`;
export const admin = `${BASE_URL}/admin`;
export const adminID = `${BASE_URL}/admin/:id`;

export const catalogue = `${BASE_URL}/catalogue`;
export const catalogueID = `${BASE_URL}/catalogue/:id`;
export const catalogueGetOne = `${BASE_URL}/catalogue/getOne/:id`;
export const catalogueSupplier = `${BASE_URL}/catalogue/supplier/:id`;

export const item = `${BASE_URL}/item`;
export const itemID = `${BASE_URL}/item/:id`;
export const itemGetOne = `${BASE_URL}/item/getOne/:id`;
export const itemCatalogue = `${BASE_URL}/item/catalogue/:id`;
export const itemSupplier = `${BASE_URL}/item/supplier/:id`;

export const managerAuth = `${BASE_URL}/manager/auth`;
export const manager = `${BASE_URL}/manager`;
export const managerID = `${BASE_URL}/manager/:id`;

export const order = `${BASE_URL}/order`;
export const orderID = `${BASE_URL}/order/:id`;
export const orderGetOne = `${BASE_URL}/order/getOne/:id`;
export const orderSiteManager = `${BASE_URL}/order/siteManager/:id`;

export const procumentStaffAuth = `${BASE_URL}/procumentStaff/auth`;
export const procumentStaff = `${BASE_URL}/procumentStaff`;
export const procumentStaffID = `${BASE_URL}/procumentStaff/:id`;

export const site = `${BASE_URL}/site`;
export const siteID = `${BASE_URL}/site/:id`;
export const siteGetOne = `${BASE_URL}/site/getOne/:id`;
export const siteSiteManager = `${BASE_URL}/site/siteManager/:id`;

export const siteManagerAuth = `${BASE_URL}/siteManager/auth`;
export const siteManager = `${BASE_URL}/siteManager`;
export const siteManagerID = `${BASE_URL}/siteManager/:id`;

export const supplierAuth = `${BASE_URL}/supplier/auth`;
export const supplier = `${BASE_URL}/supplier`;
export const supplierID = `${BASE_URL}/supplier/:id`;

