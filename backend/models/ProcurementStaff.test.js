import mongoose from 'mongoose';
import { expect } from 'chai';
import bcrypt from 'bcrypt';

// Import the ProcurementStaff model
import ProcurementStaff from './ProcurementStaff.js';

describe('ProcurementStaff Model', () => {
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

  it('should save a procurement staff', (done) => {
    const procurementStaffData = {
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      contactNo: '1234567890',
      password: 'password123',
    };

    const procurementStaff = new ProcurementStaff(procurementStaffData);

    procurementStaff.save((err, savedProcurementStaff) => {
      expect(err).to.be.null;
      expect(savedProcurementStaff).to.have.property('fname').equal('John');
      expect(savedProcurementStaff).to.have.property('lname').equal('Doe');
      expect(savedProcurementStaff).to.have.property('email').equal('john.doe@example.com');
      expect(savedProcurementStaff).to.have.property('contactNo').equal('1234567890');
      expect(savedProcurementStaff).to.have.property('permissionLevel').equal('PROCUREMENT_STAFF');

      // Check if password is hashed
      expect(bcrypt.compareSync('password123', savedProcurementStaff.password)).to.be.true;

      done();
    });
  });

  it('should not save a procurement staff without required fields', (done) => {
    const procurementStaff = new ProcurementStaff({
      // Missing required fields
    });

    procurementStaff.validate((err) => {
      expect(err).to.exist;
      done();
    });
  });
});
