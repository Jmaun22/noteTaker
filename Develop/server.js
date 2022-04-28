const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(clog);

app.use(express.urlencoded( {extended: true}));
app.use(express.static("public"));





// get route for homepage

app.get('/', (req, res) => 

    res.sendFile(path.join(__dirname, '/public/index.html'))

);


// Get route for the notes page

app.get('/notes', (req, res) => 

    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// read notes

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));

});

// read each note that is saved

app.get("api/notes/id", (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes[Number(req.params.id)]);
})

app.listen(PORT, () => 
console.log( `listening at http://localhost:${PORT} `)

);
