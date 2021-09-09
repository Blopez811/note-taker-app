const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});



app.listen(PORT, () => {
    console.log(`App listenig on PORT ${PORT}`);
});