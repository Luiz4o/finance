import {Request,Response} from 'express'
import { prisma } from '../database'

export default{
async createTransaction(request: Request, response: Response){
  try{
    const {cost,date,description,userId} = request.body

    const transaction = await prisma.transaction.create({
      data: {
        cost,
        description,
        date,
        userId
      }
    })

    return response.json({
      error: false,
      message: 'Sucesso:Transação efetuada com Sucesso!',
      transaction
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async listTransaction(request: Request, response: Response){
  try{
    const {id} = request.params

    const transaction = await prisma.transaction.findUnique({where: {id: Number(id)}})

    if(!transaction){
      return response.json({
        error:true,
        message: 'Error: Não possui histórico!'
      })
    }

    return response.json({
      error: false,
      transaction
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async updateTransaction(request: Request, response: Response){
  try{
    const {id,cost, description} = request.body

    const transactionExists = await prisma.transaction.findUnique({where: {id: Number(id)}})

    if(!transactionExists){
      return response.json({
        error:true,
        message: 'Error: Despeza não encontrada!'
      })
    }

    const transaction = await prisma.transaction.update({
      where: {
        id: Number(request.body.id)
      },
      data: {
        cost,
        description
      }

})
    return response.json({
      error: false,
      message: 'Sucesso: Atualizado com sucesso!',
      transaction
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async deleteTransaction(request: Request, response: Response){
  try{
    const {id} = request.params

    const transactionExists = await prisma.transaction.findUnique({where: {id: Number(id)}})

    if(!transactionExists){
      return response.json({
        error:true,
        message: 'Error: Despeza não encontrada!'
      })
    }

    const transaction = await prisma.transaction.delete({
      where: {
        id: Number(request.params.id)
      }

})
    return response.json({
      error: false,
      message: 'Sucesso: Deletado com sucesso!',
      transaction
    })

  }catch(error){
    return response.json({message: error.message})
  }
}
}