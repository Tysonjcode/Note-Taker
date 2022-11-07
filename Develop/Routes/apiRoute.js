const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const dbPath = path.join(__dirname, '../db/db.json');

/**
 * 
 * @returns {Array}
 */

// Helper function which will convert notes to json format and ensure that if no notes are added, an empty array is returned instead of an empty string
function getNotes(){

    // read db json
    const json = fs.readFileSync(dbPath, 'utf-8');
    //json parse
    try{
        return JSON.parse(json);
    }catch(err){
        return [];
    }
}

router.get('/api/notes', (req, res) => {
    
    //retrieve the notes from the db.json
    res.json(getNotes())
});

router.post('/api/notes', (req, res) => {

    // create new note
    const newNotes = {
        id: uuid.v4(),
        text: req.body.text,
        title: req.body.title,
    }
    // add to db json
    const existing = getNotes();

    existing.push(newNotes);

    fs.writeFileSync(dbPath, JSON.stringify(existing), 'utf-8');

    res.json(newNotes);
});

// it is then exported to be used in other files such as app.js
module.exports = router;