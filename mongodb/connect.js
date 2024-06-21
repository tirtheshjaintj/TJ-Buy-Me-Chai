// mongodb/connect.js

import mongoose from 'mongoose';

let isConnected = false;
let connection;

export const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return connection; // Return existing connection instance
  }

  try {
    connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = connection.connections[0].readyState;
    console.log('Database connected');
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    isConnected = false; // Reset isConnected flag
    throw new Error('Database connection error');
  }
};
