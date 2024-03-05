const express = require('express');
const path = require('path');
const con = require('./connection');
const bodyparser = require('body-parser');
const { rejects } = require('assert');

const filepath = path.join(__dirname,'pages');


const route = express.Router();
route.use(bodyparser.json());
route.use(bodyparser.urlencoded({extended:true}));

route.get('/',(req,res)=>{
    res.sendFile(`${filepath}/delete.html`);
});

route.post('/',(req,res)=>{
    var st_name = req.body.st_name;
    var st_rollNo = req.body.st_roll;
    
    let waitingData = new Promise((resolve,reject)=>{
    var query = `Select * from students where roll_no = ${st_rollNo}`;
        con.query(query,(err,data)=>{
            if(err){
                res.status(500).send(err); }
            else if(data.length==0){
                resolve(false); }
            else {
                query = `DELETE FROM students WHERE roll_no = ${st_rollNo}`;
                con.query(query , (err,result)=>{
                    if(err) {
                        res.status(500).send(err);
                    }
                });
                resolve(true);
            }
        })
    });
    waitingData.then((flag)=>{
        if(flag==false){
            res.send("With this roll number student not exists"); }
        else {
            res.send("Successfull deleted");
        }
    });
 });

module.exports = route;