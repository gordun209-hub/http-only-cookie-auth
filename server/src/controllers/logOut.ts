import Router from 'express'

const logOutRouter = Router()
logOutRouter.get('/', (req, res) => {
  res.clearCookie('TRAX_ACCESS_TOKEN')
  res.json({ message: 'logout' })
})

export default logOutRouter
