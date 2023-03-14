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

// Uses ToDo.js file to initialise and get ready to use database
const Todo = require('./models/Todo');

// It will find our ToDos and pass them back to ToDo file
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});


// Creates a new ToDo task, we only pass text because it's the only required field
app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    // Saves the ToDo to the collection
    todo.save();

    res.json(todo);
});


// Deletes a route (task) by its id, ':id' is a dynamic piece of data we are going to pass through the URL
// the 'id' in '/todo/delete/:id' is in 'req.params.id'
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
});

// Updates task and changes its status from active to complete
app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    // If it was 'completed' then we will change it to 'not completed' and vice-versa
    todo.complete = !todo.complete;

    // Saves it back to our database
    todo.save();

    // Pass back our todo with the new updated completion method
    res.json(todo);
});

app.listen(3001, () => console.log("Server started on port 3001"));