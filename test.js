var con = require('./connection');
con.connect((err)=>{
    if(err){
        console.log(err);
    }
    else {
        console.log("connected to database");
    }
});
con.end();