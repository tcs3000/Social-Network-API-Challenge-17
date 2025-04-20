import Thought from '../models/Thought.js';
import User from '../models/User.js';

export const getThoughts = async (req, res) => {
  try {
    console.log("Fetching all thoughts...");
    const thoughts = await Thought.find();
    console.log(thoughts);
    res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  };


export const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getThoughtById = async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err); 
    }
  };
  export const updateThought = async (req, res) => {
    try {
      const updated = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updated);
    } catch (err) {
      res.status(500).json(err);
    }};

  export const deleteThought = async (req, res) => {
    try {
      const deleted = await Thought.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      // Optionally remove thought reference from the user
      await User.findByIdAndUpdate(deleted.userId, {
        $pull: { thoughts: deleted._id }
      });
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  };

export const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
