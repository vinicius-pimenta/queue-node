export default {
  key: 'UserReport',
  options: {
    delay: 20000,
  },
  async handle({ data }) {
    const { user } = data

    console.log(user)
  }
}