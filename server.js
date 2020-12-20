var express = require("express");
var path = require("path");
var app = express();
app.use(express.static('public'))
var fs = require("fs");
var PORT = process.env.PORT || 3000;


app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
      data = JSON.parse(data);
      res.send(data);
    });
  
  })


  
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});