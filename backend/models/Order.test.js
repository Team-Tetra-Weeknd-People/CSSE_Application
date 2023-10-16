import mongoose from 'mongoose';
import { expect } from 'chai';

// Import the Order model
import Order from './Order.js';

describe('Order Model', () => {
  before((done) => {
    // Connect to a test database or set up your database connection
    mongoose.connect(process.env.REACT_APP_MONGODB_URL, { useNewUrlParser: true });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', () => {
      done();
    });
  });

  after((done) => {
    // Close the database connection after all tests are done
    mongoose.connection.close(() => {
      done();
    });
  });

  it('should save an order', (done) => {
    const orderData = {
      siteManagerID: '12345', // Replace with a valid site manager ID
      siteManagerfName: 'John',
      siteManagerlName: 'Doe',
      siteManagerContact: '1234567890',
      siteName: 'Sample Site',
      siteAddress: '123 Sample Street',
      siteContact: '9876543210',
      supplierId: '67890', // Replace with a valid supplier ID
      supplierName: 'Sample Supplier',
      itemName: 'Sample Item',
      itemDescription: 'A sample item description',
      funding: 'Sample Funding',
    };

    const order = new Order(orderData);

    order.save((err, savedOrder) => {
      expect(err).to.be.null;
      expect(savedOrder).to.have.property('siteManagerID').equal('12345');
      expect(savedOrder).to.have.property('siteManagerfName').equal('John');
      expect(savedOrder).to.have.property('siteManagerlName').equal('Doe');
      // Add more assertions for other properties as needed
      done();
    });
  });

  it('should not save an order without required fields', (done) => {
    const order = new Order({
      // Missing required fields
    });

    order.validate((err) => {
      expect(err).to.exist;
      done();
    });
  });
});
