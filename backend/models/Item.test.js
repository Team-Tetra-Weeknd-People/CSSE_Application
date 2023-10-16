import mongoose from 'mongoose';
import { expect } from 'chai';

// Import the Item model
import Item from './Item.js';

describe('Item Model', () => {
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

  it('should save an item', (done) => {
    const itemData = {
      name: 'Sample Item',
      catalogueID: '12345', // Replace with a valid catalogue ID
      supplierID: '67890', // Replace with a valid supplier ID
      supplierShopName: 'Sample Shop',
      quantity: 10,
      pricePerUnit: 20.0,
      unit: 'pcs',
    };

    const item = new Item(itemData);

    item.save((err, savedItem) => {
      expect(err).to.be.null;
      expect(savedItem).to.have.property('name').equal('Sample Item');
      expect(savedItem).to.have.property('catalogueID').equal('12345');
      expect(savedItem).to.have.property('supplierID').equal('67890');
      expect(savedItem).to.have.property('supplierShopName').equal('Sample Shop');
      expect(savedItem).to.have.property('quantity').equal(10);
      expect(savedItem).to.have.property('pricePerUnit').equal(20.0);
      expect(savedItem).to.have.property('unit').equal('pcs');
      done();
    });
  });

  it('should not save an item without required fields', (done) => {
    const item = new Item({
      // Missing required fields
    });

    item.validate((err) => {
      expect(err).to.exist;
      done();
    });
  });
});
