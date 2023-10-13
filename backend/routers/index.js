import adminRouter from './router/Admin.js';
import catelougeRouter from './router/Catalogue.js';
import itemRouter from './router/Item.js';
import managerRouter from './router/Manager.js';
import orderRouter from './router/Order.js';
import orderItemsRouter from './router/OrderItems.js';
import procumentStaffRouter from './router/ProcumentStaff.js';
import siteRouter from './router/Site.js';
import siteManagerRouter from './router/SiteManager.js';
import supplierRouter from './router/Supplier.js';

function routers(app) {
    app.use('/api/admin', adminRouter);
    app.use('/api/catelouge', catelougeRouter);
    app.use('/api/item', itemRouter);
    app.use('/api/manager', managerRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/orderItems', orderItemsRouter);
    app.use('/api/procumentStaff', procumentStaffRouter);
    app.use('/api/site', siteRouter);
    app.use('/api/siteManager', siteManagerRouter);
    app.use('/api/supplier', supplierRouter);
}

export default routers;