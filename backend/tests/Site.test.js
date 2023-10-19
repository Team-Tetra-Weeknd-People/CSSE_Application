import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';

// Import the Site model
import Site from '../models/Site.js';

describe('Site Model', () => {
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

    it('should save a site with valid fields', async () => {
        const siteData = {
            siteName: 'Sample Site',
            address: '123 Main Street',
            contact: '9876543210',
            siteManagerID: '12345',
            siteManagerfName: 'John',
            siteManagerlName: 'Doe',
            siteManagerContact: '1234567890',
        };

        const site = new Site(siteData);

        try {
            const savedSite = await site.save();
            // Ensure the savedSite contains the expected data
            expect(savedSite.siteName).to.equal('Sample Site');
            expect(savedSite.address).to.equal('123 Main Street');
            expect(savedSite.contact).to.equal('9876543210');
            // Add more assertions for other fields as needed
        } catch (error) {
            // If saving the site fails, the test will fail
            expect.fail('Site should have saved successfully');
        }
    });

    it('should not save a site without required fields', async () => {
        const site = new Site({
            // Missing required fields
        });

        try {
            await site.validate();
            // If validation succeeds, the test will fail
            expect.fail('Validation should have failed');
        } catch (error) {
            // Validation should fail, and an error will be thrown
            expect(error).to.exist;
        }
    });
});
