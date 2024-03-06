import express from 'express'
import { PORT, ATLAS_URI } from './config.js'
import mongoose from 'mongoose'
import booksRoute from './routes/booksRoute.js'

const app = express()

app.use(express.json())

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
