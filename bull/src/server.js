import 'dotenv/config'
import express from 'express'
import UserController from './app/controllers/UserController'
import { createBullBoard } from 'bull-board'
const { BullAdapter } = require('bull-board/bullAdapter')
import Queue from './app/lib/Queue'

const app = express()
const { router } = createBullBoard(Queue.queues.map(queue => new BullAdapter(queue.bull)))

app.use(express.json())

app.post('/users', UserController.store)

app.use('/admin/queues', router)

app.listen(3333, () => {
  console.log('Server running on localhost:3333')
})