import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { PORT, ATLAS_URI } from './config.js'
import booksRoute from './routes/booksRoute.js'

const app = express()

// const corsOptions = {
//   origin: 'http://localhost:4000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type']
// }

app.use(cors(), express.json())

app.use('/books', booksRoute)

app.get('/', (req, res) => res.status(234).send('Welcome To MERN Stack Tutorial'))

mongoose
  .connect(ATLAS_URI)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
      console.log(`App is listening on http://localhost:${PORT}`)
    })
  })
  .catch(err => console.err(err))
