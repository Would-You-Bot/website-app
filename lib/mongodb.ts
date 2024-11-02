import mongoose from 'mongoose'

const connection: { isConnected?: number } = {}

async function connectDb() {
  if (connection.isConnected) {
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    connection.isConnected = mongoose.connections[0].readyState
  } catch (error) {
    console.error('Error connecting to database:', error)
  }
}

export default connectDb
