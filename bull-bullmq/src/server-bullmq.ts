import 'dotenv/config'
import { makeBullmq } from './app/factories'

const workers = makeBullmq().process()

workers.forEach((worker: any) => {
  worker.on('completed', (job: any) => {
    console.log(`${job.id + " " + job.name} has completed!`);
  });
  
  worker.on('failed', (job: any, err: any) => {
    console.log(`${job.id + " " + job.name} has failed with ${err.message}`);
  });
})

