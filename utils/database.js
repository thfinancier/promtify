// Establishing connection to a database

import mongoose from 'mongoose'

let isConnected = false // to track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true) // to avoid annoying warnings

    // to check if we're currently connected
    if (isConnected) {
        console.log('MongoDB is already connected')
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'prompts-share',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected(true)

        console.log('MongoDB is connected')
    } catch (error) {
        console.error(error)
    }
}