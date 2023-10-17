import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';

// Import the Supplier model
import Supplier from '../models/Supplier.js';

describe('Supplier Model', () => {
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

    it('should save a Supplier with valid fields', async () => {
        const supplierData = {
            fname: 'John',
            lname: 'Doe',
            email: 'john.doe@example.com',
            contactNo: '1234567890',
            password: 'securePassword',
            shopName: 'Example Shop',
            type: 'Type A',
        };

        const supplier = new Supplier(supplierData);

        try {
            const savedSupplier = await supplier.save();
            // Ensure the savedSupplier contains the expected data
            expect(savedSupplier.fname).to.equal('John');
            expect(savedSupplier.lname).to.equal('Doe');
            expect(savedSupplier.email).to.equal('john.doe@example.com');
            // Add more assertions for other fields as needed
        } catch (error) {
            // If saving the Supplier fails, the test will fail
            expect.fail('Supplier should have saved successfully');
        }
    });

    it('should not save a Supplier without required fields', async () => {
        const supplier = new Supplier({
            // Missing required fields
        });

        try {
            await supplier.validate();
            // If validation succeeds, the test will fail
            expect.fail('Validation should have failed');
        } catch (error) {
            // Validation should fail, and an error will be thrown
            expect(error).to.exist;
        }
    });
});
