import express from 'express'
import { PORT, ATLAS_URI } from './config.js'
import mongoose from 'mongoose'
import { Book } from './models/bookModel.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.status(234).send('Welcome To MERN Stack Tutorial'))

app.post('/books', async (req, res) => {
  try {
    const { body: { title, author, publishYear } } = req
    if (!title || !author || !publishYear) return res.status(401).send({ message: 'Send all required fields: title, author, publishYear' })
    return res.status(201).send(await Book.create({ title, author, publishYear }))
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ message: err.message })
  }
})

mongoose
  .connect(ATLAS_URI)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
      console.log(`App is listening on http://localhost:${PORT}`)
    })
  })
  .catch(err => console.err(err))
