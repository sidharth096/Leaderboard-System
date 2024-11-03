import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
