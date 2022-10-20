import { Queue, Worker } from 'bullmq'
import redisConfig from '../../config/redis'

import * as jobs from '../jobs'

const queues = Object.values(jobs).map(job => ({
  bullmq: new Queue(job.key, { connection: redisConfig }),
  name: job.key,
  handle: job.handle,
  options: job.options
}))

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name)

    console.log(queue.options)

    return queue.bullmq.add(name, data, queue.options)
  },
  process() {
    return this.queues.map(queue => {
      return new Worker(queue.name, queue.handle, {
        connection: redisConfig,
      })
    })
  }
}