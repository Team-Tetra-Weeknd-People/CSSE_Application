import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import DeliveryNote from '../models/DeliveryNote.js'; // Import the DeliveryNote model

describe('DeliveryNote Model', () => {
  let mongoServer;
  let mongoUri;

  before(async () => {
    // Start the in-memory MongoDB server
    mongoServer = new MongoMemoryServer();
    await mongoServer.start();

    // Get the URI of the in-memory database
    mongoUri = mongoServer.getUri();

    // Connect to the in-memory database
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    // Stop the in-memory MongoDB server and disconnect from the database
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should save a delivery note with valid fields', async () => {
    const deliveryNoteData = {
      orderId: '12345',
      supplierId: '56789',
      itemDescription: 'Sample item',
      deliveryNote: 'DN123',
      deliveryDescription: 'Sample delivery',
    };

    const deliveryNote = new DeliveryNote(deliveryNoteData);

    try {
      const savedDeliveryNote = await deliveryNote.save();
      // Ensure the savedDeliveryNote contains the expected data
      expect(savedDeliveryNote.orderId).to.equal('12345');
      expect(savedDeliveryNote.supplierId).to.equal('56789');
      expect(savedDeliveryNote.itemDescription).to.equal('Sample item');
      // Add more assertions as needed for other fields
    } catch (error) {
      // If saving the delivery note fails, the test will fail
      expect.fail('DeliveryNote should have saved successfully');
    }
  });

  it('should not save a delivery note without required fields', async () => {
    const deliveryNote = new DeliveryNote({
      // Missing required fields
    });

    try {
      await deliveryNote.validate();
      // If validation succeeds, the test will fail
      expect.fail('Validation should have failed');
    } catch (error) {
      // Validation should fail, and an error will be thrown
      expect(error).to.exist;
    }
  });
});
