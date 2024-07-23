import  Express  from "express";
import UserController from "./controllers/UserController";
import TransactionController from "./controllers/TransactionController";

const app = Express();
app.use(Express.json())
const PORT = 8000

app.get('/', (request, response) =>{
  return response.send ({message: 'Heloo word'})
})

app.post('/createUser', UserController.createUser)
app.post('/createTransaction', TransactionController.createTransaction)

app.get('/listTransaction/:id', TransactionController.listTransaction)

app.put('/updateTransaction', TransactionController.updateTransaction)

app.delete('/deleteTransaction/:id', TransactionController.deleteTransaction)


app.listen(PORT, () =>{
  console.log(`Server is running ${PORT}`)
})