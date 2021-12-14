const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const {Encrypt, Decrypt} = require("./Encryption");

const PORT = 3001;
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    user:  "root",
    host:   "localhost",
    password:  "",
    database: "passwordmanager"
});
 

app.get("/showpasswords",function(req,res)
{
    db.query("Select * from passwords",function(err,result)
    {
        if(err)
        {
            console.log(err);

        }
        else 
        {
            res.send(result);
        }
    });
});


app.post("/decryptpasswords",function(req,res)
{
    res.send(Decrypt(req.body));
});

app.post("/addpassword",function(req,res)
{
    const {password, title} = req.body;
    const Hashedpass = Encrypt(password);
    db.query("INSERT INTO passwords (password,titlename,iv) VALUES (?,?,?)",[Hashedpass.password,title,Hashedpass.iv],
    function(err,result)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            //alert("Successfully Inserted");
            res.send("Successfully Inserted !!!");
        }
    });
});

app.listen(PORT,function(req,res)
{
    console.log("Running on 3001");
});