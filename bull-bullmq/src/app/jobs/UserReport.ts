export default {
  key: 'UserReport',
  async handle({ data }: any) {
    const { user } = data

    console.log(user)
  }
}