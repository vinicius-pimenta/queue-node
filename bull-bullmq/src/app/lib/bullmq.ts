import { Queue, Worker } from 'bullmq'
import redisConfig from '../../config/redis'

import * as jobs from '../jobs'
import { QueueProviderInterface } from './queue'

export class Bullmq implements QueueProviderInterface {
  private queues: any

  constructor() {
    this.queues = Object.values(jobs).map(job => ({
      bull: new Queue(job.key, { connection: redisConfig }),
      name: job.key,
      handle: job.handle
    }))
  }

  getQueues() {
    return this.queues
  }

  async add(name: any, data: any) {
    const queue = this.queues.find((queue: any) => queue.name === name)

    if (queue) queue.bull.add(name, data)
  }

  process() {
    return this.queues.map((queue: any) => {
      return new Worker(queue.name, queue.handle, {
        connection: redisConfig,
      })
    })
  }
}