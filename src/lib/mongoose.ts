import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log('MongoDB (moksha-dashboard) is already connected');
    return;
  }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI not detected');
    }

    await mongoose.connect(uri, {
      dbName: 'moksha-dashboard',
    });

    isConnected = true;
    console.log('MongoDB (moksha-dashboard) connected');
  } catch (error) {
    console.error('Error connecting to MongoDB (moksha-dashboard):', error);
    throw error;
  }
};