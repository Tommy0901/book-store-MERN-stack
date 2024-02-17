import express from 'express'
import { port } from './config.js'

const app = express()

app.get('/', (req, res) => res.status(234).send('Welcome To MERN Stack Tutorial'))

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})
