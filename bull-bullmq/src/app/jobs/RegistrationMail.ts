import { prisma } from '../../config/prisma'
import Mail from '../lib/Mail'

export default {
  key: 'RegistrationMail',
  async handle({ data }: any) {
    const { user } = data

    const test = await prisma.test.findFirst({
      where: {
        id: 1
      }
    })

    if (!test) return { error: 'Not found testCounter' }
  
    await prisma.test.update({
      where: {
        id: test.id
      },
      data: {
        count: test.count + 1
      }
    })

    await Mail.sendMail({
      from: 'Queue Test <queue@queuetest.com.br>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de usuário',
      html: `Olá, ${user.name}, bem-vindo ao sistema de filas :D`
    })
  }
}