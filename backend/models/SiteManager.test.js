import mongoose from 'mongoose';
import { expect } from 'chai';
import bcrypt from 'bcrypt';

// Import the SiteManager model
import SiteManager from './SiteManager.js';

describe('SiteManager Model', () => {
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

  it('should save a site manager', (done) => {
    const siteManagerData = {
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      contactNo: '1234567890',
      password: 'password123',
    };

    const siteManager = new SiteManager(siteManagerData);

    siteManager.save((err, savedSiteManager) => {
      expect(err).to.be.null;
      expect(savedSiteManager).to.have.property('fname').equal('John');
      expect(savedSiteManager).to.have.property('lname').equal('Doe');
      expect(savedSiteManager).to.have.property('email').equal('john.doe@example.com');
      expect(savedSiteManager).to.have.property('contactNo').equal('1234567890');
      expect(savedSiteManager).to.have.property('permissionLevel').equal('SITE_MANAGER');

      // Check if password is hashed
      expect(bcrypt.compareSync('password123', savedSiteManager.password)).to.be.true;

      done();
    });
  });

  it('should not save a site manager without required fields', (done) => {
    const siteManager = new SiteManager({
      // Missing required fields
    });

    siteManager.validate((err) => {
      expect(err).to.exist;
      done();
    });
  });
});
