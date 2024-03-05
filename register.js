
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const con = require('./connection');

const app = express.Router();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const filepath = path.join(__dirname,'pages');


app.get('/',(req,res)=>{
    res.sendFile(`${filepath}/register.html`);
});
app.post('/',(req,res)=>{
    var st_name = req.body.st_name;
    var st_rollNo = req.body.st_roll;
    var query = `Select * from students where roll_no = ${st_rollNo}`;
    let waitingData = new Promise((resolve,reject)=>{
    con.query(query,(err,data)=>{
        if(err){
            res.send("fis   "+err) }
        else if(data.length!=0){
            console.log(data);
            resolve(false);
         }
        else {
            resolve(true);
        }
       })
    });
    waitingData.then((flag)=>{
    if(flag==false){
        res.send("With this roll number stdent register");
    }
    else{
        query = `insert into students (roll_no, st_name) values (${st_rollNo},'${st_name}')`;
        con.query(query,(err,data)=>{
            if(err){
                res.send("sec   "+err); }
            else {
                res.send("Student registered successfully");
                console.log(data);
            }
        })
    }
    })
});
module.exports = app;
