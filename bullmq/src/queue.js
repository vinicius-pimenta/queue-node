import 'dotenv/config'

import Queue from './app/lib/Queue'

const workers = Queue.process()

workers.forEach(worker => {
  worker.on('completed', job => {
    console.log(`${job.id + " " + job.name} has completed!`);
  });
  
  worker.on('failed', (job, err) => {
    console.log(`${job.id + " " + job.name} has failed with ${err.message}`);
  });
})

