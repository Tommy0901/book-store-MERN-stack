import express from 'express'
import { port } from './config.js'

const app = express()

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})
