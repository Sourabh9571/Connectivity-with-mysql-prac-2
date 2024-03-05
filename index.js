
const express = require('express');
//const con = require('./connection');
const path = require('path');

const registerRouter = require('./register.js');
const deleteRouter = require('./delete.js');
const showstudentsRouter = require('./showstudents.js');

const app = express();

const filepath = path.join(__dirname,'pages');

app.get('/',(req,res)=>{
    res.sendFile(`${filepath}/home.html`);
});

app.use('/register',registerRouter);
app.use('/delete',deleteRouter);
app.use('/students',showstudentsRouter);

app.listen(5000);