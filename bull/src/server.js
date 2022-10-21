import 'dotenv/config'
import express from 'express'
import UserController from './app/controllers/UserController'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import Queue from './app/lib/Queue'

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/admin/queues')

const app = express()

createBullBoard({ queues: Queue.queues.map(queue => new BullAdapter(queue.bull)), serverAdapter })

app.use(express.json())

app.post('/users', UserController.store)

app.use('/admin/queues', serverAdapter.getRouter())

app.listen(3333, () => {
  console.log('Server running on localhost:3333')
})