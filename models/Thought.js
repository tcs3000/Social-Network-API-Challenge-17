import mongoose from 'mongoose';
import dateFormat from '../utils/dateFormat.js';

// Reaction Schema (Subdocument)
const reactionSchema = new mongoose.Schema({
  reactionId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, get: dateFormat }
}, {
  toJSON: { getters: true },
  id: false
});

// Thought Schema
const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now, get: dateFormat },
  username: { type: String, required: true },
  reactions: [reactionSchema]
}, {
  toJSON: { virtuals: true, getters: true },
  id: false
});

// Virtual to get the reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

export default mongoose.model('Thought', thoughtSchema);
