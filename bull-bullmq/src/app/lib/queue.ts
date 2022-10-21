export interface QueueProviderInterface {
  getQueues(): any
  add(name: any, data: any): void
  process(): any
} 