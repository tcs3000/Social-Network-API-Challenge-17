import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] 
  },
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  toJSON: { virtuals: true },
  id: false
});

// Virtual to get the friend count
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

export default mongoose.model('User', userSchema);
