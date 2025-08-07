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
const User = require('./models/user'); // ✅ use correct file name AND path casing (important on some systems)

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

// fetch the users data from database 
app.get("user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId); // find the user by ID and exclude password from the response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: "Error fetching the user details." });
    }
});

//endpoint to login in
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password." });
        }
        const secretKey = crypto.randomBytes(32).toString("hex"); // creates a random 32 byte string used for encryption 

        const token = jwt.sign({ userId: user._id }, secretKey);

        // send the token back to the client
        return res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ message: "Error logging in user." });
    }
})

//matches 
app.get("/matches", async (req, res) => {
    try {
        const { userId } = req.query;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        };
        let filter = {};
        if (user.gender === 'Men') {
            filter.gender = 'Women';
        } else if (user.gender == 'Women') {
            filter.gender = 'Men';
        }

        let query = {
            _id: { $ne: userId },
        };
        if (user.type) {
            filter.type = user.type;
        };

        // find current user in MongoDB and populate the likedProfiles and matches 
        const currentUser = await User.findById(userId).populate("matches", "_id").populate("likedProfiles", "_id");
        const friendsIds = currentUser.matches.map((friend) => friend._id);

        //liked profiles that the user has liked but not matched with 
        const crushIds = currentUser.likedProfiles.map((crush) => crush._id);

        // find all users that match the filter where the _id is not the current user or their friends or crushes
        // so we can see new matches
        const matches = await User.find(filter).where('_id').nin([userId, ...friendsIds, ...crushIds]);


        //return the matches to the client
        return res.status(200).json({ matches });
    } catch (error) {
        res.status(500).json({ message: "Error fetching matches." });
    }
})