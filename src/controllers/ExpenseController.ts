import {Request,Response} from 'express'
import { prisma } from '../database'

export default{
async createExpense(request: Request, response: Response){
  try{
    const {cost,date,description,userId} = request.body

    const expense = await prisma.expense.create({
      data: {
        cost,
        description,
        date,
        userId
      }
    })

    return response.json({
      error: false,
      message: 'Sucesso:Despesa adicionada com Sucesso!',
      expense
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async listExpense(request: Request, response: Response){
  try{
    const {id} = request.params

    const expense = await prisma.expense.findUnique({where: {id: Number(id)}})

    if(!expense){
      return response.json({
        error:true,
        message: 'Error: Não possui histórico!'
      })
    }

    return response.json({
      error: false,
      expense
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async findAllExpense(request: Request, response: Response): Promise<void>{
  try{
    const {id} = request.params //Informe o id do usuario para busca

    const expenses = await prisma.expense.findMany({where: {userId: Number(id)}})

    response.status(200).json(expenses)}
    catch(error){
      response.status(500).json({message: 'Erro interno do servidor'})
    }
    },
async updateExpense(request: Request, response: Response){
  try{
    const {id,cost, description} = request.body

    const expenseExists = await prisma.expense.findUnique({where: {id: Number(id)}})

    if(!expenseExists){
      return response.json({
        error:true,
        message: 'Error: Despeza não encontrada!'
      })
    }

    const expense = await prisma.expense.update({
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
      expense
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async deleteExpense(request: Request, response: Response){
  try{
    const {id} = request.params

    const expenseExists = await prisma.expense.findUnique({where: {id: Number(id)}})

    if(!expenseExists){
      return response.json({
        error:true,
        message: 'Error: Despeza não encontrada!'
      })
    }

    const expense = await prisma.expense.delete({
      where: {
        id: Number(request.params.id)
      }

})
    return response.json({
      error: false,
      message: 'Sucesso: Deletado com sucesso!',
      expense
    })

  }catch(error){
    return response.json({message: error.message})
  }
}
}