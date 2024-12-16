const pg = require('pg');
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const Router = express.Router();
const pool = require("./models/postgres");


app.use(cors());
app.use(express.json());
require("dotenv").config();

const port = process.env.PORT || process.env.LocalPort || 5002;


//postgres is case sensitive, so if you want to use exact same case for tablename, column names then include the name in double quotes or it defaults to lowercase
app.use("/Create", Router.post("/Table", async(req, res) => {
    const result = pool.query('CREATE TABLE Customer ("customerID" VARCHAR PRIMARY KEY, name VARCHAR(100), phoneno VARCHAR(20), email VARCHAR(50) )');
        if (result) {
            res.status(200).send("Table Created")
        }

    }));

app.use("/Add", Router.post("/Customer", ( req, res) => {
    //const {customerID, name, phoneno, email} = req.body
    let customerID, name, phoneno, email;
    ({ customerID, name, phoneno, email } = req.body);
    var result = pool.query(`INSERT INTO Customer ("customerID", "name", "phoneno", "email") VALUES ($1, $2, $3, $4) RETURNING *`, [customerID, name, phoneno
    , email], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`URL added with ID: ${results.rows[0].customerID}`); 
        //this statement can read customerID as undefined if the table has column name with different case eg.customerid
    });

}));

app.use("/Get", Router.get("/Customer", async (req, res) => {
    let row;
    var cart=[];	
    /*const result = await pool.query("Select * from Customer");
    res.send(result.rows[0]);*/
    //const query = `SELECT * FROM Customer`;
    var result = await pool.query(
        "Select * from Customer", (error, results) => {
            //console.log(results.rows);
            for (row of results.rows) {
                cart.push(row);
            }
            res.status(200).json(cart);
        }) 
        
}));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));