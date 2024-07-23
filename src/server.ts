import  Express  from "express";
import UserController from "./controllers/UserController";
import RecipeController from "./controllers/RecipeController";
import ExpenseController from "./controllers/ExpenseController";

const app = Express();
app.use(Express.json())
const PORT = 8000

app.get('/', (request, response) =>{
  return response.send ({message: 'Heloo word'})
})

app.post('/createUser', UserController.createUser)

app.get('/listUser/:id',UserController.listUser)

app.get('/findAllUser/:id',UserController.findAllUser)

app.put('/updateUser', UserController.updateUser)

app.delete('/deleteUser/:id', UserController.deleteUser)

app.post('/createRecipe', RecipeController.createRecipe)

app.get('/listRecipe/:id',RecipeController.listRecipe)

app.get('/findAllRecipe/:id',RecipeController.findAllRecipe)

app.put('/updateRecipe', RecipeController.updateRecipe)

app.delete('/deleteRecipe/:id', RecipeController.deleteRecipe)

app.post('/createExpense', ExpenseController.createExpense)

app.get('/listExpense/:id',ExpenseController.listExpense)

app.get('/findAllExpense/:id',ExpenseController.findAllExpense)

app.put('/updateExpense', ExpenseController.updateExpense)

app.delete('/deleteExpense/:id', ExpenseController.deleteExpense)


app.listen(PORT, () =>{
  console.log(`Server is running ${PORT}`)
})