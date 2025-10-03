import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = `mongodb+srv://
${process.env.MONGODB_USERNAME as string}:${process.env.MONGODB_PASSWORD as string}@${
  process.env.MONGODB_HOST as string
}/${process.env.MONGODB_PARAMS as string}&appName=${process.env.MONGODB_APP_NAME as string}`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  },
})

async function connectToDatabase (): Promise<void> {
  try {
    await client.connect()
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}
export { client, connectToDatabase }
