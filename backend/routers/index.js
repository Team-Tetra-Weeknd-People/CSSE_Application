import adminRouter from './router/Admin.js';
import catalogueRouter from './router/Catalogue.js';
import itemRouter from './router/Item.js';
import managerRouter from './router/Manager.js';
import orderRouter from './router/Order.js';
import procurementStaffRouter from './router/ProcurementStaff.js';
import siteRouter from './router/Site.js';
import siteManagerRouter from './router/SiteManager.js';
import supplierRouter from './router/Supplier.js';
import deliveryNoteRouter from './router/DeliveryNote.js';

function routers(app) {
    app.use('/api/admin', adminRouter);
    app.use('/api/catalogue', catalogueRouter);
    app.use('/api/item', itemRouter);
    app.use('/api/manager', managerRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/procurementStaff', procurementStaffRouter);
    app.use('/api/site', siteRouter);
    app.use('/api/siteManager', siteManagerRouter);
    app.use('/api/supplier', supplierRouter);
    app.use('/api/deliveryNote', deliveryNoteRouter);
}

export default routers;