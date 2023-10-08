// Establishing connection to a database

import mongoose from 'mongoose'

let isConnected = false // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  // check if we're currently connected
  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'promts-share',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
  }
}
