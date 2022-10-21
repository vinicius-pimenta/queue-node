import 'dotenv/config'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3333';

let MAX_REQUESTS = 50
let SLEEP_TIME = 1

if (process.env.NUMBER_OF_REQUESTS) {
  MAX_REQUESTS = parseInt(process.env.NUMBER_OF_REQUESTS)
}

if (process.env.SLEEP_TIME) {
  SLEEP_TIME = parseInt(process.env.SLEEP_TIME)
}

console.log({
  Type: 'Stress',
  MAX_REQUESTS,
  SLEEP_TIME
})

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function handle() {
  const requests: Promise<any>[] = []

  for (let i = 0; i < MAX_REQUESTS; i++) {
    await sleep(SLEEP_TIME)

    requests.push(
      axios.post('/users', {
        "email": "vinicius@email.com",
        "password": "123456"
      }).then((res) => {
        console.log({ i })
    }))
  }
  Promise.all(requests).then(res => {
    console.log('All requests handled')
  })
  .catch((err) => {
    console.log(err)
  })
}

handle()