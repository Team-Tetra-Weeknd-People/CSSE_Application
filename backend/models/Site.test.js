import mongoose from 'mongoose';
import { expect } from 'chai';

// Import the Site model
import Site from './Site.js';

describe('Site Model', () => {
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

  it('should save a site', (done) => {
    const siteData = {
      siteName: 'Sample Site',
      address: '123 Sample Street',
      contact: '9876543210',
      siteManagerID: '12345', // Replace with a valid site manager ID
      siteManagerfName: 'John',
      siteManagerlName: 'Doe',
      siteManagerContact: '1234567890',
    };

    const site = new Site(siteData);

    site.save((err, savedSite) => {
      expect(err).to.be.null;
      expect(savedSite).to.have.property('siteName').equal('Sample Site');
      expect(savedSite).to.have.property('address').equal('123 Sample Street');
      expect(savedSite).to.have.property('contact').equal('9876543210');
      expect(savedSite).to.have.property('siteManagerID').equal('12345');
      expect(savedSite).to.have.property('siteManagerfName').equal('John');
      // Add more assertions for other properties as needed
      done();
    });
  });

  it('should not save a site without required fields', (done) => {
    const site = new Site({
      // Missing required fields
    });

    site.validate((err) => {
      expect(err).to.exist;
      done();
    });
  });
});
