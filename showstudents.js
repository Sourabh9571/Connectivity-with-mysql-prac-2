
const express = require('express');
const path = require('path');
const con = require('./connection');

const route = express.Router();
const filepath = path.join(__dirname,'pages');

var query = 'Select * from students';
route.get('/',(req,res)=>{
    con.query(query,(err,result)=>{
        if(err){
            res.send(err); }
        else {
            res.render(`${filepath}/showstudents.ejs`,{students:result});
        }
    })
});

module.exports = route;