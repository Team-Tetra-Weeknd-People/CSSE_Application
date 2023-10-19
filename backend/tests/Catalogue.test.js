import mongoose from 'mongoose';
import { expect } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server-global'; // Import the MongoMemoryServer
import Catalogue from '../models/Catalogue.js';


  describe('Catalogue Model', () => {
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
    it('should save a catalogue with valid fields', async () => {
      const catalogueData = {
        name: 'Sample Catalogue',
        description: 'A sample product catalogue',
        supplierID: '12345', // Replace with a valid supplier ID
      };
    
      const catalogue = new Catalogue(catalogueData);
    
      try {
        const savedCatalogue = await catalogue.save();
        // Ensure the savedCatalogue contains the expected data
        expect(savedCatalogue.name).to.equal('Sample Catalogue');
        expect(savedCatalogue.description).to.equal('A sample product catalogue');
        expect(savedCatalogue.supplierID).to.equal('12345');
      } catch (error) {
        // If saving the catalogue fails, the test will fail
        expect.fail('Catalogue should have saved successfully');
      }
    });

    it('should not save a catalogue without required fields', async () => {
      const catalogue = new Catalogue({
      // Missing required fields
    });

      try {
        await catalogue.validate();
        // If validation succeeds, the test will fail
        expect.fail('Validation should have failed');
      } catch (error) {
        // Validation should fail, and an error will be thrown
        expect(error).to.exist;
      }
    });
});