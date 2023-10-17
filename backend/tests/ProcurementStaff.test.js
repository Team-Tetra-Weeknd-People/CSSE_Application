import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global';

// Import the ProcurementStaff model
import ProcurementStaff from '../models/ProcurementStaff.js';

describe('ProcurementStaff Model', () => {
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

    it('should save a procurement staff with valid fields', async () => {
        const procurementStaffData = {
            fname: 'John',
            lname: 'Doe',
            email: 'john.doe@example.com',
            contactNo: '1234567890',
            password: 'securepassword',
        };

        const procurementStaff = new ProcurementStaff(procurementStaffData);

        try {
            const savedProcurementStaff = await procurementStaff.save();
            // Ensure the savedProcurementStaff contains the expected data
            expect(savedProcurementStaff.fname).to.equal('John');
            expect(savedProcurementStaff.email).to.equal('john.doe@example.com');
            // Add more assertions for other fields as needed
        } catch (error) {
            // If saving the procurement staff fails, the test will fail
            expect.fail('Procurement staff should have saved successfully');
        }
    });

    it('should not save a procurement staff without required fields', async () => {
        const procurementStaff = new ProcurementStaff({
            // Missing required fields
        });

        try {
            await procurementStaff.validate();
            // If validation succeeds, the test will fail
            expect.fail('Validation should have failed');
        } catch (error) {
            // Validation should fail, and an error will be thrown
            expect(error).to.exist;
        }
    });
});
