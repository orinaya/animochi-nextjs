import { MongoClient, ServerApiVersion } from 'mongodb'
import mongoose from 'mongoose'

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME as string}:${
  process.env.MONGODB_PASSWORD as string
}@${process.env.MONGODB_HOST as string}/${process.env.MONGODB_DATABASE_NAME as string}${
  process.env.MONGODB_PARAMS as string
}&appName=${process.env.MONGODB_APP_NAME as string}`

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverSelectionTimeoutMS: 5000,
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true
//   },
// })

// async function connectMongooseToDatabase (): Promise<void> {
//   try {
//     await mongoose.connect(uri)
//     console.log('Mongoose connected to MongoDB database')
//   } catch (error) {
//     console.error('Error connecting to the database:', error)
//   }
// }

// async function connectToDatabase (): Promise<void> {
//   try {
//     await client.connect()
//     console.log('Connected to MongoDB database')
//   } catch (error) {
//     console.error('Error connecting to the database:', error)
//   }
// }

// export { client, connectToDatabase, connectMongooseToDatabase }
// import mongoose from "mongoose"

// const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE_NAME}${process.env.MONGODB_PARAMS}&appName=${process.env.MONGODB_APP_NAME}`

let isConnected = false
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
async function connectToDatabase (): Promise<void> {
  if (isConnected) return

  try {
    const db = await mongoose.connect(uri)
    isConnected = db.connections[0].readyState === 1
    console.log('✅ Mongoose connected to MongoDB')
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error)
    throw error
  }
}

async function connectMongooseToDatabase (): Promise<void> {
  try {
    await mongoose.connect(uri)
    console.log('Mongoose connected to MongoDB database')
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

export { client, connectToDatabase, connectMongooseToDatabase }
