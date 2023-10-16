import mongoose from 'mongoose';
import { expect } from 'chai';

// Import the Catalogue model
import Catalogue from './Catalogue.js';

describe('Catalogue Model', () => {
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

  it('should save a catalogue', (done) => {
    const catalogueData = {
      name: 'Sample Catalogue',
      description: 'A sample product catalogue',
      supplierID: '12345', // Replace with a valid supplier ID
    };

    const catalogue = new Catalogue(catalogueData);

    catalogue.save((err, savedCatalogue) => {
      expect(err).to.be.null;
      expect(savedCatalogue).to.have.property('name').equal('Sample Catalogue');
      expect(savedCatalogue).to.have.property('description').equal('A sample product catalogue');
      expect(savedCatalogue).to.have.property('supplierID').equal('12345');
      done();
    });
  });

  it('should not save a catalogue without required fields', (done) => {
    const catalogue = new Catalogue({
      // Missing required fields
    });

    catalogue.validate((err) => {
      expect(err).to.exist;
      done();
    });
  });
});
