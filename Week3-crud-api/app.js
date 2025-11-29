require ('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

PORT = process.env.PORT

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors('*'))

let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build CRUD API', completed: true},
    { id: 3, task: 'Submit Assignment', completed: false},
    { id: 4, task: 'Review Code', completed: true},
    { id: 5, task: 'Deploy Application', completed: true}
];

//
app.get ('/todos/completed', (req, res) => {
    const completed = todos.filter((t) => t.completed === true);
    res.status(200).json(completed);
})

app.get ('/todos/pending', (req, res) => {
    const pending = todos.filter((t) => !t.completed);
    res.json(pending);
})

//Get Request - Read all todos
app.get('/todos', (req, res) => {
    res.status(200).json(todos); // Get all todos
});

app.get('/todos/:id', (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo); // Get todo by ID
});

//Post Request - Create a new todo
app.post('/todos', (req, res) => {
    const newTodo = { id: todos.length + 1, task: req.body.task, ...req.body}//Auto-ID and task
    if (!req.body.task) {
        return res.status(400).json({ message: 'Task is required' });
    }
    todos.push(newTodo);
    res.status(201).json(newTodo); // Return the created todo
})

// PATCH Request - Update a todo
app.patch('/todos/:id', (req,res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    Object.assign(todo, req.body); // Update the todo with new data
    res.status(200).json(todo); // Return the updated todo
})

// DELETE Request - Delete a todo
app.delete('/todos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    todos = todos.filter((t) => t.id !== id);
    if (todos.length === initialLength) {
        return res.status(404).json({ message: 'Todo not found' });
    }res.status(200).json({ message: 'Todo deleted successfully' });
})


app.use((err, req, res, next) => {
    res.status(500).json({error: 'Server error!'})
})

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
})