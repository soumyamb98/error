const express = require("express");

const index = express();

const PORT = process.env.port || 5400;

// adding array
const friends = [
    {
        id: 99,
        name: "first FrnD"
    },
    {
        id: 99,
        name: "secOnd FrnD"
    },
    {
        id: 99,
        name: "thIrd FrnD"
    }
]


index.use(function (req, res, next) {
    const reqStartTime = Date.now();
    console.log(`${req.method} ${req.url} is the req.method & req.url ${reqStartTime}`);
    next();


    const reqEndTime = Date.now();
    const timeDiff = reqEndTime - reqStartTime;
    console.log(`${req.method} ${req.url} is the req.method & req.url && ${timeDiff}ms is the time taken for the request`);
});
//json parsing middleware
index.use(express.json());

index.get("/", (req, res) => {
    res.send("hOMe UrL");
});

index.get("/friends", function (req, res) {
    res.json(friends);
});



index.post("/friends", function (req, res) {
    //checking/verifying req.body
    if (req.body.namefromjson){
        res.status(404).json({error: "Invalid input"})
    } else {
        const newFriend = {

        name: req.body.namefromjson,
        id: 99 + friends.length
        };
        friends.push(newFriend);
    
        res.json(friends);
    }
})

index.get("/friends/:friendId", (req, res) => {
    const Idfriend = req.params.friendId;
    const friend = friends[Idfriend];
    
    if (friend) {
        res.status(200).json(friend);
    } else { 
        
        res.status(404).json({ message: "404 error friend not in list" });
    }
})
index.get("/messages", (req, res) => {
    res.send("<ul><li>HeLlO FrIEnDs</li></ul>")
});

index.post("/messages", (req, res) => {
    res.send("entering messages into database")
    console.log("updating messages");
});


index.listen(PORT, () => {
    console.log(` server listening at ${PORT} `);
})