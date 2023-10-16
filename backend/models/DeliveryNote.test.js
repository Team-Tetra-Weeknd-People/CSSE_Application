import mongoose from 'mongoose';
import { expect } from 'chai';

// Import the DeliveryNote model
import DeliveryNote from './DeliveryNote.js';

describe('DeliveryNote Model', () => {
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

  it('should save a delivery note', (done) => {
    const deliveryNoteData = {
      orderId: '12345', // Replace with a valid order ID
      supplierId: '67890', // Replace with a valid supplier ID
      itemDescription: 'Sample Item',
      deliveryNote: 'DN-001',
      deliveryDescription: 'A sample delivery note',
    };

    const deliveryNote = new DeliveryNote(deliveryNoteData);

    deliveryNote.save((err, savedDeliveryNote) => {
      expect(err).to.be.null;
      expect(savedDeliveryNote).to.have.property('orderId').equal('12345');
      expect(savedDeliveryNote).to.have.property('supplierId').equal('67890');
      expect(savedDeliveryNote).to.have.property('itemDescription').equal('Sample Item');
      expect(savedDeliveryNote).to.have.property('deliveryNote').equal('DN-001');
      expect(savedDeliveryNote).to.have.property('deliveryDescription').equal('A sample delivery note');
      done();
    });
  });

  it('should not save a delivery note without required fields', (done) => {
    const deliveryNote = new DeliveryNote({
      // Missing required fields
    });

    deliveryNote.validate((err) => {
      expect(err).to.exist;
      done();
    });
  });
});
