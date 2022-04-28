const notes = require('express').Router();
const fs = require('fs');

// const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../../helpers/fsUtils');

const { v4: uuidv4 } = require('uuid');
// read notes

notes.get('/', (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes);

});

// read each note that is saved

notes.get("/:id", (req, res) => {
    let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes[Number(req.params.id)]);
})


// saving notes

notes.post("/", (req, res) => {
    let dbNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let writtenNote = req.body;
    writtenNote.id = uuidv4();
    dbNote.push(writtenNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(dbNote));
    console.log('note saved');
    res.json(dbNote);

});


// delteing notes

notes.delete("/:id", (req, res) => {

    
    let dbNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let notesid = req.params.id;
    let noteid = 0;

    dbNote = dbNote.filter(note => {
        return note.id != notesid;
    });

    for (note of dbNote) {
        note.id = noteid.toString();
        noteid++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(dbNote));
    res.json(dbNote);

})


module.exports = notes;
