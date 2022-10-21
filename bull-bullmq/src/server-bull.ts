import 'dotenv/config'
import { makeBull } from './app/factories'

const workers = makeBull().process()

workers.forEach((worker: any) => {
  worker.bull.on('completed', (job: any) => {
    console.log(`${job.id + " " + worker.name} has completed!`);
  });
  
  worker.bull.on('failed', (job: any, err: any) => {
    console.log(`${job.id + " " + worker.name} has failed with ${err.message}`);
  });
})

