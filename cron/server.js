import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectToDatabase, updateMonstersStates } from './db.js'

dotenv.config({ path: '../.env.local' })

const app = express()
const PORT = process.env.PORT || 3001
app.use(cors())

connectToDatabase()

app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy')
})

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)

  // Background worker: loop forever and run work after a random timeout (1-10s)
  let stopped = false
  let currentTimeout = null

  const worker = async () => {
    /* eslint-disable-next-line no-unmodified-loop-condition */
    while (!stopped) {
      const delay = Math.floor(Math.random() * 10000) + 1000 // 1000..10000 ms
      await new Promise((resolve) => {
        currentTimeout = setTimeout(resolve, delay)
      })
      currentTimeout = null
      if (stopped) break

      try {
        // Replace this with the real work you want the worker to do
        console.log('[worker] run -', new Date().toISOString(), `(delay ${delay}ms)`)
        await updateMonstersStates()
      } catch (err) {
        console.error('[worker] error', err)
      }
    }
    console.log('[worker] stopped')
  }

  // Start the worker (no await; it runs in background)
  worker()

  // Graceful shutdown: stop the loop, clear any pending timeout and close server
  const shutdown = (signal) => {
    console.log(`Received ${signal}, shutting down worker and server...`)
    stopped = true
    if (currentTimeout) {
      clearTimeout(currentTimeout)
      currentTimeout = null
    }
    server.close(() => {
      console.log('HTTP server closed')
      process.exit(0)
    })
    // force exit if server doesn't close in time
    setTimeout(() => process.exit(1), 5000)
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
})
