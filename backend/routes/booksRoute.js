import express from 'express'
import { Book } from '../models/bookModel.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { body: { title, author, publishYear } } = req
    const ifCond = !title || !author || !publishYear
    if (ifCond) return res.status(401).json({ message: 'Send all required fields: title, author, publishYear' })

    res.status(201).json(await Book.create({ title, author, publishYear }))
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
})

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const { params: { id } } = req
    const result = await Book.findById(id)
    if (!result) return res.status(404).json({ message: 'Book not found' })

    res.status(200).json(result)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { params: { id }, body: { title, author, publishYear } } = req
    const ifCond = !title || !author || !publishYear
    if (ifCond) return res.status(401).send({ message: 'Send all required fields: title, author, publishYear' })

    const result = await Book.findByIdAndUpdate(id, { title, author, publishYear })
    if (!result) return res.status(404).json({ message: 'Book not found' })

    res.status(200).json({ message: 'Book updated successfully' })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { params: { id } } = req
    const result = await Book.findByIdAndDelete(id)
    if (!result) return res.status(404).json({ message: 'Book not found' })

    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
})

export default router
