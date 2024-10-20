import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose"
import { TodoModel } from "./Models/todo.models.js"
const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/todos')
dotenv.config({ path: './env' })


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})
app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.log(err))
})
app.put('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.log(err))
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

export default app;
