import { CandidateModel } from '../models/candidateModel.js';

export const getCandidates = async (req, res) => {
  try {
    const { stage } = req.query;
    const candidates = await CandidateModel.findAll(stage);
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Error fetching candidates" });
  }
};

export const getCandidateById = async (req, res) => {
  try {
    const candidate = await CandidateModel.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.status(200).json(candidate);
  } catch (error) {
    console.error("Error fetching candidate:", error);
    res.status(500).json({ message: "Error fetching candidate" });
  }
};

export const createCandidate = async (req, res) => {
  try {
    const { name, stage } = req.body;
    if (!name || !stage) return res.status(400).json({ message: "Name and stage are required" });

    const newCandidate = await CandidateModel.create(req.body);
    res.status(201).json(newCandidate);
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({ message: "Error creating candidate" });
  }
};

export const updateCandidate = async (req, res) => {
  try {
    const updatedCandidate = await CandidateModel.update(req.params.id, req.body);
    if (!updatedCandidate) return res.status(404).json({ message: "Candidate not found or no data provided" });
    res.status(200).json(updatedCandidate);
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).json({ message: "Error updating candidate" });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const success = await CandidateModel.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Candidate not found" });
    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    res.status(500).json({ message: "Error deleting candidate" });
  }
};