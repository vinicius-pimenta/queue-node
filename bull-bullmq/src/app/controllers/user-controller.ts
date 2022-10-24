import { QueueProviderInterface } from '../lib/queue'

export class UserController {
  private queueProvider: QueueProviderInterface

  constructor(queueProvider: QueueProviderInterface) {
    this.queueProvider = queueProvider
  }

  async store(req: any, res: any) {
    const { name, email, password } = req.body

    const user = {
      name,
      email,
      password
    }

    console.log({user})

    this.queueProvider.add('RegistrationMail', { user })
    // this.queueProvider.add('UserReport', { user })

    return res.json(user)
  }
}