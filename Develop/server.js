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


// saving notes

app.post("/api/notes", (req, res) => {
    let dbNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let writtenNote = req.body;
    writtenNote.id = uuidv4();
    dbNote.push(writtenNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(dbNote));
    console.log('note saved');
    res.json(dbNote);
  

})


app.listen(PORT, () => 
console.log( `listening at http://localhost:${PORT} `)

);
