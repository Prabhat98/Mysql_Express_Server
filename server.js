const express = require("express");
const server = express();
const db = require("./db");

server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.set("view engine","hbs")

server.get("/",(req,res) =>
{
    //then is called for if we want to do something after the Promise task has ended
    //persons in .then(persons) is the rows array returned by the function getAllUsers
    //persons become the same array i.e rows, so persons become the array containing name
    //age and city
    //Now need to create a fake array coz we are getting real array from the database
    db.getAllUsers()
        .then((persons) =>
        {
            res.render("persons",{persons})
        })
    
        //catch let's us handle the error if it occurs
        .catch((err) =>
        {
            res.send(err)            
        })
})

server.get("/add",(req,res) =>
{
    res.render("persons_add")
})

//Since the action is on /add and the method is post therefore we need to create 
//a POST request handler for this path, i.e what will happen after POST req be sent
//so in the following we will add persons to the table

server.post("/add",(req,res) =>{
    db.addNewPerson(req.body.name,req.body.age,req.body.city)
        .then(() =>
        {
            res.redirect("/");//if successfully added then redirected to the root path i.e
            //getAllUsers path
        })
        .catch((err) => 
        {
            res.send(err);//if there be an error then send the error back to the user
        })
})

server.listen(4433, () =>
{
    console.log("Server started on http://localhost:4433/")
})// A callback function that will run when the server starts running 