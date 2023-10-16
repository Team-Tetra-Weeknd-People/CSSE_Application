import mongoose from 'mongoose';
import { expect } from 'chai';
import bcrypt from 'bcrypt';

// Import the Supplier model
import Supplier from './Supplier.js';

describe('Supplier Model', () => {
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

  it('should save a supplier', (done) => {
    const supplierData = {
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      contactNo: '1234567890',
      password: 'password123',
      shopName: 'Sample Shop',
      type: 'Sample Type',
    };

    const supplier = new Supplier(supplierData);

    supplier.save((err, savedSupplier) => {
      expect(err).to.be.null;
      expect(savedSupplier).to.have.property('fname').equal('John');
      expect(savedSupplier).to.have.property('lname').equal('Doe');
      expect(savedSupplier).to.have.property('email').equal('john.doe@example.com');
      expect(savedSupplier).to.have.property('contactNo').equal('1234567890');
      expect(savedSupplier).to.have.property('permissionLevel').equal('SUPPLIER');
      expect(savedSupplier).to.have.property('shopName').equal('Sample Shop');
      expect(savedSupplier).to.have.property('type').equal('Sample Type');

      // Check if password is hashed
      expect(bcrypt.compareSync('password123', savedSupplier.password)).to.be.true;

      done();
    });
  });

  it('should not save a supplier without required fields', (done) => {
    const supplier = new Supplier({
      // Missing required fields
    });

    supplier.validate((err) => {
      expect(err).to.exist;
      done();
    });
  });
});
