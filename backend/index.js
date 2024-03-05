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
    const ifCond = !title || !author || !publishYear
    if (ifCond) return res.status(401).send({ message: 'Send all required fields: title, author, publishYear' })
    res.status(201).json(await Book.create({ title, author, publishYear }))
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
})

app.get('/books', async (req, res) => {
  try {
    const data = await Book.find()
    res.status(200).json({
      count: data.length,
      data
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
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
