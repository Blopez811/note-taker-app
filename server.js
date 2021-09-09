const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;
const db = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('./public'))

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
     res.json(db);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4()
    db.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
      res.json(req.body)
})


app.listen(PORT, () => {
    console.log(`App listenig on PORT ${PORT}`);
});