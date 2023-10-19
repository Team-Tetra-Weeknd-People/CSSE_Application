import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';

// Import the Order model
import Order from '../models/Order.js';

describe('Order Model', () => {
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

    it('should save an order with valid fields', async () => {
        const orderData = {
            siteManagerID: '123',
            siteManagerfName: 'John',
            siteManagerlName: 'Doe',
            siteManagerContact: '1234567890',
            siteName: 'Sample Site',
            siteAddress: '123 Main St',
            siteContact: '9876543210',
            status: 'To Be Priced',
            supplierId: '456',
            supplierName: 'Sample Supplier',
            itemName: 'Sample Item',
            itemDescription: 'A sample item description',
            funding: 'Sample Funding',
        };

        const order = new Order(orderData);

        try {
            const savedOrder = await order.save();
            // Ensure the savedOrder contains the expected data
            expect(savedOrder.siteManagerID).to.equal('123');
            expect(savedOrder.siteManagerfName).to.equal('John');
            expect(savedOrder.status).to.equal('To Be Priced');
            // Add more assertions for other fields as needed
        } catch (error) {
            // If saving the order fails, the test will fail
            expect.fail('Order should have saved successfully');
        }
    });

    it('should not save an order without required fields', async () => {
        const order = new Order({
            // Missing required fields
        });

        try {
            await order.validate();
            // If validation succeeds, the test will fail
            expect.fail('Validation should have failed');
        } catch (error) {
            // Validation should fail, and an error will be thrown
            expect(error).to.exist;
        }
    });
});
