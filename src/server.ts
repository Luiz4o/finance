import  Express  from "express";
import UserController from "./controllers/UserController";
import RecipeController from "./controllers/RecipeController";
import ExpenseController from "./controllers/ExpenseController";
import cors from 'cors'
import { checkToken } from "./middleware/authMiddleware";

const app = Express();
const bcrypt = require('bcrypt')


app.use(cors({
//  origin:'http://localhost:5173'
}));

app.use(Express.json())
const PORT = 8000

app.get('/', (request, response) =>{
  return response.send ({message: 'Hello word'})
})

app.post('/auth/register', UserController.createUser)


app.post('/auth/login',UserController.loginUser)

//private
app.get('/user/:id',checkToken,UserController.listUser)

app.put('/updateUser', UserController.updateUser)

app.delete('/deleteUser/:id', UserController.deleteUser)

app.post('/createRecipe', RecipeController.createRecipe)

// app.get('/recipe/:id',RecipeController.listRecipe)

app.get('/recipes/:id',RecipeController.findAllRecipe)

app.put('/updateRecipe', RecipeController.updateRecipe)

app.delete('/deleteRecipe/:id', RecipeController.deleteRecipe)

app.post('/createExpense', ExpenseController.createExpense)

app.get('/expenses/:id',ExpenseController.findAllExpense)

app.put('/updateExpense', ExpenseController.updateExpense)

app.delete('/deleteExpense/:id', ExpenseController.deleteExpense)


app.listen(PORT, () =>{
  console.log(`Server is running ${PORT}`)
})