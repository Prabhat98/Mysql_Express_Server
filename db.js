const mysql = require("mysql2");
const connection = mysql.createConnection({
    host:"localhost",
    database:"mydatabase",
    user:"myuser",
    password:"mypass"
});

//This function will simply DISPLAY THE TABLE
//This function will return rows(array) as the object which in server.js is used as a person
function getAllUsers()
{// Another way of using async functions are Promises
    //A promise object (the return value) represents faliure or completion of async operation
    return new Promise(function(resolve,reject)
    {
        connection.query(
            `SELECT * FROM persons`,
            function(err,rows,col)
            {
                if(err)// if error occurs then reject function is called
                {
                    reject(err);
                }
                else// if no error then resolve is called, i.e Promise ran successfully
                {
                    resolve(rows);//rows will be an array containing name, ageand city
                }
            }
        )
    })
}
//This function will INSERT VALUES TO TABLE
function addNewPerson(name,age,city)
{
    return new Promise(function(resolve,reject){
        connection.query(
            `INSERT INTO persons(name,age,city) VALUES(?,?,?)`,// sanitization from sql injection
            [name,age,city],
            function(err,result)
            {
                if(err)
                {
                    reject(err);
                }
                else//no need to send anything to resolve coz if no error that means that insertion worked
                {
                    resolve();
                }
            }
        )
    })
}

//We'll not use connection.close here coz as long as out express server is running we want 
//to keep our connection open

//We'll export the getAllUsers() function

module.exports = 
{
    getAllUsers,
    addNewPerson
}