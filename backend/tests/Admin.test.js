import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import Admin from '../models/Admin.js'; // Import the Admin model

describe('Admin Model', () => {
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

  it('should save an admin with valid fields', async () => {
    const adminData = {
      fname: 'John',
      lname: 'Doe',
      email: 'johndoe@example.com',
      contactNo: '1234567890',
      password: 'password123',
      permissionLevel: 'ADMIN',
    };

    const admin = new Admin(adminData);

    try {
      const savedAdmin = await admin.save();
      // Ensure the savedAdmin contains the expected data
      expect(savedAdmin.fname).to.equal('John');
      expect(savedAdmin.lname).to.equal('Doe');
      expect(savedAdmin.email).to.equal('johndoe@example.com');
      // Add more assertions as needed for other fields
    } catch (error) {
      // If saving the admin fails, the test will fail
      expect.fail('Admin should have saved successfully');
    }
  });

  it('should not save an admin without required fields', async () => {
    const admin = new Admin({
      // Missing required fields
    });

    try {
      await admin.validate();
      // If validation succeeds, the test will fail
      expect.fail('Validation should have failed');
    } catch (error) {
      // Validation should fail, and an error will be thrown
      expect(error).to.exist;
    }
  });
});
