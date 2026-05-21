const mongoose = require('mongoose');
const Admin = require('../models/Admin');

// MongoDB connection URI
const MONGO_URI = 'mongodb+srv://client_password:passworD123@quickchat.85gmgnb.mongodb.net/client_project';

async function createAdmin() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 2. Admin details
    const newAdmin = new Admin({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123'  // This will be hashed before saving
    });

    // 3. Save to DB
    await newAdmin.save();
    console.log("Admin user created successfully!");

    // 4. Exit
    mongoose.disconnect();
  } catch (error) {
    console.error("Error creating admin:", error.message);
    mongoose.disconnect();
  }
}

createAdmin();
