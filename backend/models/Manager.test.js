import mongoose from 'mongoose';
import { expect } from 'chai';
import bcrypt from 'bcrypt';

// Import the Manager model
import Manager from './Manager.js';

describe('Manager Model', () => {
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

  it('should save a manager', (done) => {
    const managerData = {
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      contactNo: '1234567890',
      password: 'password123',
    };

    const manager = new Manager(managerData);

    manager.save((err, savedManager) => {
      expect(err).to.be.null;
      expect(savedManager).to.have.property('fname').equal('John');
      expect(savedManager).to.have.property('lname').equal('Doe');
      expect(savedManager).to.have.property('email').equal('john.doe@example.com');
      expect(savedManager).to.have.property('contactNo').equal('1234567890');
      expect(savedManager).to.have.property('permissionLevel').equal('MANAGER');

      // Check if password is hashed
      expect(bcrypt.compareSync('password123', savedManager.password)).to.be.true;

      done();
    });
  });

  it('should not save a manager without required fields', (done) => {
    const manager = new Manager({
      // Missing required fields
    });

    manager.validate((err) => {
      expect(err).to.exist;
      done();
    });
  });
});
