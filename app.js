const http = require('http');
const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/html/index.html"));
})

app.get("/detail", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/html/detail.html"));
})

server.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
})

