import { mongoose } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '../.env.local' })

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE_NAME}${process.env.MONGODB_PARAMS}&appName=${process.env.MONGODB_APP_NAME}`

const MONSTER_STATES = ['sad', 'angry', 'hungry', 'sleepy']

async function connectToDatabase () {
  try {
    console.log(uri)
    await mongoose.connect(uri)
    console.log('Mongoose connected to MongoDB database')
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

async function updateMonstersStates () {
  try {
    const monsters = await mongoose.connection.db.collection('monsters').find({}).toArray()
    for (const monster of monsters) {
      // Example update: set all monsters to 'idle' state
      await mongoose.connection.db
        .collection('monsters')
        .updateOne(
          { _id: monster._id },
          { $set: { state: MONSTER_STATES[Math.floor(Math.random() * MONSTER_STATES.length)] } }
        )

      console.log(`Updated monster ${monster._id} state to ${monster.state}`)
    }
  } catch (error) {
    console.error('Error updating monsters states:', error)
  }
}

export { connectToDatabase, updateMonstersStates }
