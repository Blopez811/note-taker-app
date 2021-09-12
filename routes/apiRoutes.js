const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
let db = require('../db/db.json')

router.get('/notes', (req, res) => {
    res.json(db);
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4()
    db.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.json(req.body)
});

router.delete('/notes/:id', (req, res) => {
    let deleteBtnId = req.params.id;
    db  = db.filter(note => note.id !== deleteBtnId);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log('The delete file has been saved!');
    })
    
    res.sendStatus(204)
    // res.json(req.body);  
})


module.exports = router