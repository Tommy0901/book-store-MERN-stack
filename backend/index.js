import express from 'express'
import { PORT, ATLAS_URI } from './config.js'
import mongoose from 'mongoose'

const app = express()

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
