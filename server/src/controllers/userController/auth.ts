import { User } from '@prisma/client'
import Router from 'express'
import jwt from 'jsonwebtoken'

import prisma from '../../lib/prisma'

const authRouter = Router()

authRouter.get('/', async (req, res) => {
  const token = req.cookies.TRAX_ACCESS_TOKEN
  if (!token) {
    return res.sendStatus(401)
  }

  if (token) {
    let user: null | User
    try {
      const { id } = jwt.verify(token, '31') as { id: number }
      user = await prisma.user.findUnique({
        where: {
          id
        }
      })
      if (!user) {
        throw new Error('not user')
      }
    } catch (e) {
      res.status(401)
      res.json({ error: 'Invalid token' })
      return
    }
    res.json(user).status(200)
  }
})

export default authRouter
