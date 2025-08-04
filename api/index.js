//import node packages 
const express = require("express");  //web server
const bodyParser = require("body-parser"); // read request data sent from frontend 
const mongoose = require("mongoose"); // talks to MongoDB
const crypto = require("crypto"); //uses for hashing passwords
const jwt = require('jsonwebtoken'); // import JSON Web Token libraries 

//create the express app and define a port 
const app = express(); // app is the server
const port = 3000; // decalre port 


//CORS : Cross Orgin Resource Sharing
const cors = require("cors"); // enable CORS to allow frontend to connect 

//create http server and wrap in express app 
const http = require('http').createServer(app);
const io = require('socket.io')(http); // set up Socket.IO which allows chat 


//lets app accept request from frontend 
app.use(cors());

//parse form-style data sent from the frontend 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parses JSON data from the front end 
app.use(express.json()); // double checking JSON letters sent to server 

//MongoDB connect using this password and address using the library to connect to the database

mongoose.connect("mongodb+srv://hrmacias:Basketball2!@cluster0.ringjqa.mongodb.net/").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});

//once connected start the server and listen on port so people can access the app
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//import the Mongoose User Model used to create/save users in the database
const User = require("./models/user");

// sets up a POST route in register i.e when someone tries to register handle their data here 
app.post("/register", async (req, res) => {
    try {
        const userData = req.body; // grab the data from the request body 

        const newUser = new User(userData); // create a new instance of user using the data from the form 

        await newUser.save(); // save the user to the mongoDB 
        const secretKey = crypto.randomBytes(32).toString("hex"); // creates a random 32 byte string used for encryption 

        // JWT : JSON web token, creates token so you can stay signed in 
        // important for user authentication that proves who a user is after they log in
        const token = jwt.sign({ userId: newUser._id }, secretKey);

        //send response to client and include the token of the JSON object
        res.status(200).json({ token })
    } catch (error) {
        console.log("Error creating user", error);
        res.status(500).json({ error: "Internal server error" })
    }
})
