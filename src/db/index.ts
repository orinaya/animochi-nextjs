import { MongoClient, ServerApiVersion } from 'mongodb'
import mongoose from 'mongoose'

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME as string}:${
  process.env.MONGODB_PASSWORD as string
}@${process.env.MONGODB_HOST as string}/${process.env.MONGODB_DATABASE_NAME as string}${
  process.env.MONGODB_PARAMS as string
}&appName=${process.env.MONGODB_APP_NAME as string}`

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  },
})
async function connectToDatabase (): Promise<void> {
  try {
    await client.connect()
    console.log('Connected to MongoDB database')
  } catch (error) {
    console.error('Error connecting to the database:', error)
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
