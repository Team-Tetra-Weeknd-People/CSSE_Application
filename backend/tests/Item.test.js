import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';

// Import the Item model
import Item from '../models/Item.js';

describe('Item Model', () => {
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

    it('should save an item with valid fields', async () => {
        const itemData = {
            name: 'Sample Item',
            catalogueID: '12345', // Replace with a valid catalogue ID
            supplierID: '56789', // Replace with a valid supplier ID
            supplierShopName: 'Sample Shop',
            quantity: 10,
            pricePerUnit: 5.0,
            unit: 'pcs',
        };

        const item = new Item(itemData);

        try {
            const savedItem = await item.save();
            // Ensure the savedItem contains the expected data
            expect(savedItem.name).to.equal('Sample Item');
            expect(savedItem.catalogueID).to.equal('12345');
            expect(savedItem.supplierID).to.equal('56789');
            expect(savedItem.supplierShopName).to.equal('Sample Shop');
            expect(savedItem.quantity).to.equal(10);
            expect(savedItem.pricePerUnit).to.equal(5.0);
            expect(savedItem.unit).to.equal('pcs');
        } catch (error) {
            // If saving the item fails, the test will fail
            expect.fail('Item should have saved successfully');
        }
    });

    it('should not save an item without required fields', async () => {
        const item = new Item({
            // Missing required fields
        });

        try {
            await item.validate();
            // If validation succeeds, the test will fail
            expect.fail('Validation should have failed');
        } catch (error) {
            // Validation should fail, and an error will be thrown
            expect(error).to.exist;
        }
    });
});
