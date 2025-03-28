// resetAdminPassword.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/FYP');
    console.log('MongoDB Connected');
    
    const newPassword = 'admin123'; // Choose your new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    const result = await mongoose.connection.collection('users').updateOne(
      { email: 'admin@gmail.com' },
      { $set: { password: hashedPassword } }
    );
    
    if (result.modifiedCount === 1) {
      console.log('Admin password successfully reset!');
      console.log('New password:', newPassword);
    } else {
      console.log('Password reset failed');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
};

resetAdminPassword();