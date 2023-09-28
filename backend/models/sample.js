import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sampleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        require: true
    }
}, {
    timestamps: {
        createdAt: 'createdOn',
        updatedAt: 'updatedOn'
    }
});

const Sample = mongoose.model('Sample', sampleSchema);

export default Sample;