import {Request,Response} from 'express'
import { prisma } from '../database'
export default{
async createRecipe(request: Request, response: Response){
  try{
    const {price,date,description,userId} = request.body

    const recipe = await prisma.recipe.create({
      data: {
        price,
        description,
        date,
        userId
      }
    })

    return response.json({
      error: false,
      message: 'Sucesso:Receita adicionada com Sucesso!',
      recipe
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async listRecipe(request: Request, response: Response){
  try{
    const {id} = request.params

    const recipe = await prisma.recipe.findUnique({where: {id: Number(id)}})

    if(!recipe){
      return response.json({
        error:true,
        message: 'Error: Não possui histórico!'
      })
    }

    return response.json({
      error: false,
      recipe
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async findAllRecipe(request: Request, response: Response): Promise<void>{
  try{
    const {id} = request.params //Informe o id do usuario para busca

    const recipes = await prisma.recipe.findMany({where: {userId: Number(id)}})

    response.status(200).json(recipes)}
    catch(error){
      response.status(500).json({message: 'Erro interno do servidor'})
    }
    }

,
async updateRecipe(request: Request, response: Response){
  try{
    const {id,price, description} = request.body

    const recipeExists = await prisma.recipe.findUnique({where: {id: Number(id)}})

    if(!recipeExists){
      return response.json({
        error:true,
        message: 'Error: Despeza não encontrada!'
      })
    }

    const recipe = await prisma.recipe.update({
      where: {
        id: Number(request.body.id)
      },
      data: {
        price,
        description
      }

})
    return response.json({
      error: false,
      message: 'Sucesso: Atualizado com sucesso!',
      recipe
    })

  }catch(error){
    return response.json({message: error.message})
  }
},
async deleteRecipe(request: Request, response: Response){
  try{
    const {id} = request.params

    const recipeExists = await prisma.recipe.findUnique({where: {id: Number(id)}})

    if(!recipeExists){
      return response.json({
        error:true,
        message: 'Error: Despeza não encontrada!'
      })
    }

    const recipe = await prisma.recipe.delete({
      where: {
        id: Number(request.params.id)
      }

})
    return response.json({
      error: false,
      message: 'Sucesso: Deletado com sucesso!',
      recipe
    })

  }catch(error){
    return response.json({message: error.message})
  }
}
}