import mongoose from 'mongoose'

const { Schema } = mongoose

const monsterSchema = new Schema(
  {
    name: {
      type: String, // = 'string'
      required: true
    },
    level: {
      type: Number,
      required: false,
      default: 1
    },
    draw: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true,
      enum: ['happy', 'sad', 'angry', 'hungry', 'sleepy'],
      default: 'happy'
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    bufferCommands: false,
    timestamps: true
  }
)

export default mongoose.models.Monster ?? mongoose.model('Monster', monsterSchema)
