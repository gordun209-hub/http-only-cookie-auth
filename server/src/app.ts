import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'

import authRouter from './controllers/userController/auth'
import userInfoRouter from './controllers/userController/changeUserInfo'
import LoginRouter from './controllers/userController/login'
import logOutRouter from './controllers/userController/logOut'
import SignupRoute from './controllers/userController/signup'
import { requestLogger } from './utils/middleware'

const app: Application = express()
app.use(express.json())
app.use(
  cors({
    origin: true,
    credentials: true
  })
)
app.use(cookieParser())
app.use(requestLogger)

app.use('/api/login', LoginRouter)
app.use('/api/signup', SignupRoute)
app.use('/api/logout', logOutRouter)
app.use('/api/me', authRouter)
app.use('/api/userInfo', userInfoRouter)
export default app
