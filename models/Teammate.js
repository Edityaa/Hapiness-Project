import mongoose from 'mongoose';

const TeammateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  event: { type: String, default: 'Birthday' },
  birthday: { type: String, required: true }, // Format: YYYY-MM-DD
  email: { type: String },
  initials: String,
  color: { type: String, default: 'bg-indigo-500' },
  status: { type: String, default: 'Active' },
}, { timestamps: true });

export default mongoose.models.Teammate || mongoose.model('Teammate', TeammateSchema);