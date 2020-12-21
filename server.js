//imports dependecies
var express = require("express");
var path = require("path");
//sets up express app
var app = express();
// serves static files
app.use(express.static('public'))
var fs = require("fs");
const writeFile = fs.writeFileSync;
var moment = require('moment');
var PORT = process.env.PORT || 3000;
// parses incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


function idGenerate(time) {
  var timeId = "";
  for (i = 0; i < time.length; i++) {
    if (!(time[i] == "-" || time[i] == ":")) {
      timeId += time[i];
    }
  }
  return timeId;
}


 // reads the database parse the content and send to the client
app.get("/api/notes", (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    res.send(data);
  });

})
// add id to the note,push into array write to file and send to client
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
// Deleting the notes using the id
app.delete('/api/notes/:id', (req, res) => {

  const deletedId = req.params.id
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    targetNote = data.filter(({ id }) => id != deletedId);

    writeFile("./db/db.json", JSON.stringify(targetNote));
  });

  res.send("id no: " + deletedId + " deleted");

})
// getting the html files
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
//starts the server listening port
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});