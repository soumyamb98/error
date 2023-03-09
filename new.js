const http = require('http');
const PORT = process.env.PORT || 5400;
const server = http.createServer();

const friends = [
    {
        id: 0,
        name: "first friend"
    },
    {
        id: 1,
        name: "second friend"
    },
    {
        id: 2,
        name: "third friend"
    }
]
server.on("request", (req, res) => {
    const urlSplit = req.url.split("/");
    if (req.method === "POST" && urlSplit[1] === "friends") {
        req.on("data", (data) => {
            const friendsdatareq = data.toString();
            console.log(friendsdatareq, "== request")
            const jsobjectfriendsdatareq = JSON.parse(friendsdatareq);
            friends.push(jsobjectfriendsdatareq);
            // req.pipe(res) is working unlike shown in the video but res not consoling in the browser in the then()
            // req.pipe(res);
        });
        // not working and throwing server error
        req.pipe(res);
    }
    else if (req.method === "GET" && urlSplit[1] === "friends") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        if (urlSplit[2]) {
            const friendIndex = Number(urlSplit[2]);
            console.log(typeof urlSplit[2], "typeof urlSplit[2]")
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if (req.method === "GET" && req.url === "/messages") {
        // another way of setting headers
        res.setHeader("Content-Type", "text/html");

        res.write('<html>');
        res.write("<body>")
        res.write('<ul><li> Hello there</li><li>Whats are your thoughts today?</li></ul>')
        res.write("</body>")
        res.write("</html>");
        //always type res.end otherwise its like res is not ended and it waits for more res
        res.end();
    }
    else if (req.url === "/") {
        res.end("HOme urLS");
    }
    // add else otherwise it will wait for res infinitely 
    else {
        res.statusCode = 404;
        res.end(" 404 PAGE NOT FOUND ");
    }
});

server.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
})

// fetch("http://localhost:5400/friends",{method: "POST", body: JSON.stringify({id: 99, name: "RYAN DAHL"})}).then((response)=>{response.json()}).then((friend) =>{ console.log(friend, ": friend")});