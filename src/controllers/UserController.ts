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
},
async listUser(request: Request, response: Response){
  try{
    const {id} = request.params

    const user = await prisma.user.findMany({where: {id: Number(id)}})

    if(!user){
      return response.json({
        error:true,
        message: 'Error: Não possui histórico!'
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
async findAllUser(request: Request, response: Response): Promise<void>{
  try{
    const {id} = request.params //Informe o id do usuario para busca

    const users = await prisma.user.findMany({where: {id: Number(id)}})

    response.status(200).json(users)}
    catch(error){
      response.status(500).json({message: 'Erro interno do servidor'})
    }
},
async updateUser(request: Request, response: Response){
  try{
    const {name,email, password,id} = request.body

    const userExists = await prisma.user.findUnique({where: {id: Number(id)}})

    if(!userExists){
      return response.json({
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
        password
      }

})
    return response.json({
      error: false,
      message: 'Sucesso: Atualizado com sucesso!',
      user
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async deleteUser(request: Request, response: Response){
  try{
    const {id} = request.params

    const userExists = await prisma.user.findUnique({where: {id: Number(id)}})

    if(!userExists){
      return response.json({
        error:true,
        message: 'Error: Despeza não encontrada!'
      })
    }

    const user = await prisma.user.delete({
      where: {
        id: Number(request.params.id)
      }

})
    return response.json({
      error: false,
      message: 'Sucesso: Deletado com sucesso!',
      user
    })

  }catch(error){
    return response.json({message: error.message})
  }
}
}