import mongoose from 'mongoose';

const MovementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['deposit', 'transfer', 'receive'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  details: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Movement || mongoose.model('Movement', MovementSchema);