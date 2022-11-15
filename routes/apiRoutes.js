// Dependancies 
const app = require('express').Router();
const fs = require('fs');
let db = require('../db/db.json');


app.get('/notes', (req, res) => {
  db = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))

  res.json(db);

});

// this is the basic form of model i chose to use
app.post('/notes', (req, res) => {
  let newNote = {
    id: Math.floor(Math.random() * 1000),
    title: req.body.title,
    text: req.body.text
  }

  // this is a basic form of controller i chose to use
  db.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(db), (err, res) => {
    if(err) throw err;
  });

  res.json(db);

})
// this enables to delete a note
app.delete('/notes/:id', (req, res) => {
  let db = require('../db/db.json');
  
  let notesToKeep = [];

  for(let i = 0; i < db.length; i++) {
    console.log(req.params.id)
    console.log(db[i].id)

    if (parseInt(db[i].id) !== parseInt(req.params.id)) {
      notesToKeep.push(db[i]);
    }
  }

  console.log(notesToKeep);

  db = notesToKeep;
  fs.writeFileSync('./db/db.json', JSON.stringify(db), (err, res) => {
    if(err) throw err;
  });

  res.json(db);

});

module.exports = app;