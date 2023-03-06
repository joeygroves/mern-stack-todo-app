// Handles our API
const express = require('express');
// Handles our database
const mongoose = require('mongoose');
// Handles our cors
const cors = require('cors');

// Creates an Express application
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Todo = require('./models/Todo');

// It will find our ToDos and pass them back to ToDo file
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.listen(3001, () => console.log("Server started on port 3001"));