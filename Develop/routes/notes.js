const fb = require('express').Router();

// const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

fb.get('/', (req, res) => 

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))

);

fb.post('/', (req, res) => {



    readAndAppend("dssad", './db/db.json');

    if(x > 1) {


    const response = {
        status: 'success',
        body: "fdafa",
    };
    res.json(response);
} else {
    res.json("Error note didnt post")

}
});


module.exports = fb;
