import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';

// Import the SiteManager model
import SiteManager from '../models/SiteManager.js';

describe('SiteManager Model', () => {
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

    it('should save a SiteManager with valid fields', async () => {
        const siteManagerData = {
            fname: 'John',
            lname: 'Doe',
            email: 'john.doe@example.com',
            contactNo: '1234567890',
            password: 'securePassword',
        };

        const siteManager = new SiteManager(siteManagerData);

        try {
            const savedSiteManager = await siteManager.save();
            // Ensure the savedSiteManager contains the expected data
            expect(savedSiteManager.fname).to.equal('John');
            expect(savedSiteManager.lname).to.equal('Doe');
            expect(savedSiteManager.email).to.equal('john.doe@example.com');
            // Add more assertions for other fields as needed
        } catch (error) {
            // If saving the SiteManager fails, the test will fail
            expect.fail('SiteManager should have saved successfully');
        }
    });

    it('should not save a SiteManager without required fields', async () => {
        const siteManager = new SiteManager({
            // Missing required fields
        });

        try {
            await siteManager.validate();
            // If validation succeeds, the test will fail
            expect.fail('Validation should have failed');
        } catch (error) {
            // Validation should fail, and an error will be thrown
            expect(error).to.exist;
        }
    });
});
