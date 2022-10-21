import Queue from 'bull'
import redisConfig from '../../config/redis'

import * as jobs from '../jobs'
import { QueueProviderInterface } from './queue'

export class Bull implements QueueProviderInterface {
  private queues: any

  constructor() {
    this.queues = Object.values(jobs).map(job => ({
      bull: new Queue(job.key, { redis: redisConfig }),
      name: job.key,
      handle: job.handle
    }))
  }

  getQueues() {
    return this.queues
  }

  add(name: any, data: any) {
    const queue = this.queues.find((queue: any) => queue.name === name)

    if (queue) queue.bull.add(data)
  }

  process() {
    return this.queues.map((queue: any) => {
      queue.bull.process(queue.handle)

      return queue
    })
  }
}