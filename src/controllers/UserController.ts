import {Request,Response} from 'express'
import { prisma } from '../database'
import bcrypt from 'bcrypt'

const jwt = require('jsonwebtoken')

export default{

async createUser(request: Request, response: Response){
  try{
    const {name, email,password} = request.body
    const userExist = await prisma.user.findUnique({where: {email}})

    if(userExist){
      return response.json({
        error: true,
        message: 'Erro: Usuário já existe!'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashPassword
      }

    })

    return response.json({
      error: false,
      message: 'Sucesso:Usuário cadastrado com Sucesso!',
      newUser
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async loginUser(request: Request, response: Response){
  const{email, password} =request.body

  const user = await prisma.user.findUnique({where: {email}})

    if(!user){
      return response.status(401).json({
        message: 'Erro: Email ou senha inválidos!'
      })
    }

    const verifyUser = await bcrypt.compare(password, user.hashPassword)

    if(!verifyUser){
      return response.status(401).json({
        message: 'Erro: Email ou senha inválidos!'
      })
    }

    try{
      const secret = process.env.SECRET

      const token = jwt.sign({
        id: user.id,
      },
    secret,
  )

  return response.status(200).json({message:'Autenticação realizada com sucesso',token,id: user.id})
    } catch(error){
      console.log(error)
    }


}
,
async listUser(request: Request, response: Response){
  try{
    const {id} = request.params

    const user = await prisma.user.findMany({where: {id: Number(id)},select: {id: true,name: true,email: true}})

    if(!user){
      return response.json({
        error:true,
        message: 'Error: Não possui Usuario cadastrado!'
      })
    }

    return response.json({
      error: false,
      user
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async updateUser(request: Request, response: Response){
  try{
    const {name,email, hashPassword,id} = request.body

    const userExists = await prisma.user.findUnique({where: {id: Number(id)}})

    if(!userExists){
      return response.status(401).json({
        error:true,
        message: 'Error: Despeza não encontrada!'
      })
    }

    const user = await prisma.user.update({
      where: {
        id: Number(request.body.id)
      },
      data: {
        name,
        email,
        hashPassword
      }

})
    return response.status(200).json({
      error: false,
      message: 'Sucesso: Atualizado com sucesso!',
      user
    })

  }catch(error){
    return response.status(401).json({message: error.message})
  }
},
async deleteUser(request: Request, response: Response){
  try{
    const {id} = request.params

    const userExists = await prisma.user.findUnique({where: {id: Number(id)}})

    if(!userExists){
      return response.status(401).json({
        error:true,
        message: 'Error: Usuario não encontrado!'
      })
    }

    const user = await prisma.user.delete({
      where: {
        id: Number(request.params.id)
      }

})
    return response.status(200).json({
      error: false,
      message: 'Sucesso: Deletado com sucesso!',
      user
    })

  }catch(error){
    return response.status(401).json({message: error.message})
  }
}
}