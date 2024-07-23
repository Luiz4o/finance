import {Request,Response} from 'express'
import { prisma } from '../database'

export default{
async createUser(request: Request, response: Response){
  try{
    const {name, email,password} = request.body
    const userExist = await prisma.user.findUnique({where: {email}})

    const amount=0

    if(userExist){
      return response.json({
        error: true,
        message: 'Erro: Usuário já existe!'
      })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        amount
      }
    })

    return response.json({
      error: false,
      message: 'Sucesso:Usuário cadastrado com Sucesso!',
      user
    })

  }catch(error){
    return response.json({message: error.message})
  }
}
}