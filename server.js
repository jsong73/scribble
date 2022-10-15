const express = require("express");
const fs = require("fs");
const path = require("path");

const notes = require("./db/notes.json")

//use preconfigured port ; if none go to default specified 3001 port
const PORT = process.env.PORT || 3001;

//calling the express library
const app = express();

//For POST and PUT requests for sending data to the server
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//when user goes to the / url then it will take them to the index.html page
app.get("/", (req, res) =>
 res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET request for notes
app.get("/api/notes", (req, res) => {
res.status(200).json(notes)
});

//POST request to add notes
app.post("/api/notes", (req, res) => {
console.log ("note has been added")
});

const newNote = {


}


//converts new note data to string 
const noteString = JSON.stringify(newNote);

fs.readFile(notes, "utf-8", (err, data) => {
const parsedNotes = JSON.parse(data)
parsedNotes.push(newNote);

//parameters to format array spacing 
const stringifiedNotes = JSON.stringify(parsedNotes, null, 4);

fs.writeFile(notes, stringifiedNotes, (err) =>{
console.log(err);
});
});


//allowing express access to the public folder 
app.use(express.static("public"));

//listens to PORT
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}!`));