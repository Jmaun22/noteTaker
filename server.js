const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true}));
app.use(express.static("public"));
app.use('/api', api);




// get route for homepage

app.get('/', (req, res) => 

    res.sendFile(path.join(__dirname, '/public/index.html'))

);


// Get route for the notes page

app.get('/notes', (req, res) => 

    res.sendFile(path.join(__dirname, '/public/notes.html'))
);



app.listen(PORT, () => 
console.log( `listening at http://localhost:${PORT} `)

);
