import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { expect } from 'chai';

// Import the Admin model
import Admin from './Admin.js';

describe('Admin Model', () => {
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

  it('should save an admin', (done) => {
    const adminData = {
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      contactNo: '1234567890',
      password: 'password123',
    };

    const admin = new Admin(adminData);

    admin.save((err, savedAdmin) => {
      expect(err).to.be.null;
      expect(savedAdmin).to.have.property('fname').equal('John');
      expect(savedAdmin).to.have.property('lname').equal('Doe');
      expect(savedAdmin).to.have.property('email').equal('john.doe@example.com');
      expect(savedAdmin).to.have.property('contactNo').equal('1234567890');
      expect(savedAdmin).to.have.property('password');

      // Check if password is hashed
      expect(bcrypt.compareSync('password123', savedAdmin.password)).to.be.true;

      done();
    });
  });

  it('should not save an admin without required fields', (done) => {
    const admin = new Admin({
      // Missing required fields
    });

    admin.validate((err) => {
      expect(err).to.exist;
      done();
    });
  });

  it('should set default permission level to "ADMIN"', (done) => {
    const admin = new Admin({
      fname: 'Jane',
      lname: 'Smith',
      email: 'jane.smith@example.com',
      contactNo: '9876543210',
      password: 'password123',
    });

    admin.save((err, savedAdmin) => {
      expect(savedAdmin.permissionLevel).to.equal('ADMIN');
      done();
    });
  });
});
