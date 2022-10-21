import 'dotenv/config'
import express from 'express'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
// import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'
import { makeBullmq } from './app/factories'
// import { makeBull } from './app/factories'
import { makeUserController } from './app/factories'

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/admin/queues')

const app = express()

createBullBoard({ queues: makeBullmq().getQueues().map((queue: any) => new BullMQAdapter(queue.bull)), serverAdapter })
// createBullBoard({ queues: makeBull().getQueues().map((queue: any) => new BullAdapter(queue.bull)), serverAdapter })

app.use(express.json())

app.post('/users', makeUserController().store.bind(makeUserController()))

app.use('/admin/queues', serverAdapter.getRouter())

app.listen(3333, () => {
  console.log('Server running on localhost:3333')
})