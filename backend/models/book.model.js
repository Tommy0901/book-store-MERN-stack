import mongoose from 'mongoose'

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    publishYear: {
      type: Number,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

export const Book = mongoose.model('Book', bookSchema)
