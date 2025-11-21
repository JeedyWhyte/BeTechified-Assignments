require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

const PORT = process.env.PORT

//Custom Middleware
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} at ${new Date().toLocaleTimeString()}`);
    next();
})

//For GET request
app.get('/', (req, res) => res.send('My Week 2 API!'));

//For POST request
app.post('/user', (req, res) => {
    const { name, email} =req.body;
    //When field is missing
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing required fields: name and email'});
    }
    res.send(`Hello, ${name}!`)
})

//For GET request with query parameters
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    res.send (`User ${id} profile`)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));