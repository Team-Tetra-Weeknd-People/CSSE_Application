import Sample from "../models/sample.js";

const getSamples = async (req, res) => {
    try {
        const samples = await Sample.find();
        res.status(200).json(samples);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createSample = async (req, res) => {
    const body = req.body;
    console.log(body, "data");
    const newSample = new Sample(body);
    try {
        await newSample.save();
        res.status(201).json(body);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateSample = async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const sample = await Sample.findByIdAndUpdate(id, update);
        const updatedSample = await Sample.findById(id);
        res.status(200).json(updatedSample);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteSample = async (req, res) => {
    const id = req.params.id;
    try {
        await Sample.findByIdAndDelete(id);
        res.status(200).json({ message: "Sample deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
const getOneSample = async (req, res) => {
    const id = req.params.id;
    try {
        const sample = await Sample.findById(id);
        res.status(200).json(sample);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default {
    getSamples,
    createSample,
    updateSample,
    deleteSample,
    getOneSample
};
