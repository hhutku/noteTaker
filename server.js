var express = require("express");
var path = require("path");
var app = express();
app.use(express.static('public'))
var fs = require("fs");
var moment = require('moment');
var PORT = process.env.PORT || 3000;

function idGenerate(time) {
  var timeId = "";
  for (i = 0; i < time.length; i++) {
    if (!(time[i] == "-" || time[i] == ":")) {
      timeId += time[i];
    }
  }
  return timeId;
}
app.post("/api/notes", (req, res) => {
  var time = moment().format();
  req.body.id = idGenerate(time);

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    data.push(req.body);

    writeFile("./db/db.json", JSON.stringify(data));
  });

  res.json(req.body);
})

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