import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';

// Import the Manager model
import Manager from '../models/Manager.js';

describe('Manager Model', () => {
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

    it('should save a manager with valid fields', async () => {
        const managerData = {
            fname: 'John',
            lname: 'Doe',
            email: 'john.doe@example.com',
            contactNo: '1234567890',
            password: 'password123',
        };

        const manager = new Manager(managerData);

        try {
            const savedManager = await manager.save();
            // Ensure the savedManager contains the expected data
            expect(savedManager.fname).to.equal('John');
            expect(savedManager.lname).to.equal('Doe');
            expect(savedManager.email).to.equal('john.doe@example.com');
            expect(savedManager.contactNo).to.equal('1234567890');
        } catch (error) {
            // If saving the manager fails, the test will fail
            expect.fail('Manager should have saved successfully');
        }
    });

    it('should not save a manager without required fields', async () => {
        const manager = new Manager({
            // Missing required fields
        });

        try {
            await manager.validate();
            // If validation succeeds, the test will fail
            expect.fail('Validation should have failed');
        } catch (error) {
            // Validation should fail, and an error will be thrown
            expect(error).to.exist;
        }
    });
});
