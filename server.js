const express = require("express");
const fs = require("fs");
const path = require("path");

//use preconfigured port ; if none go to default specified 3001 port
const PORT = process.env.PORT || 3001;

//calling the express library
const app = express();

//allowing express access to the public folder 
app.use(express.static("public"));

//For POST and PUT requests for sending data to the server
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//when user goes to the / url then it will take them to the index.html page
app.get("/", (req, res) =>
//dont need to put /public before /notes as app.use(express.static) already refrences the public folder
 res.sendFile(path.join(__dirname, "/index.html"))
);

// GET request for notes
app.get("/api/notes", (req, res) => {
res.status(200).json("./db/notes.json")
});

app.get("/notes", (req, res) => {
//path.join _dirname broke code => swiched to using
res.sendFile("notes.html", {root: "public"})
});

//POST request to add notes
app.post("/api/notes", (req, res) => {

//object destructuring - requesting the title/text from the index.js = > saveNote function => fetch body => newNote obj  => title/text value
const { title, text } = req.body

// if all the properties are present, save the object
if ( title && text ){
const newNote = {
title,
text,
};


fs.readFile("./db/notes.json", "utf-8", (err, data) => {
    const parsedNotes = JSON.parse(data);
     parsedNotes.push(newNote);


    fs.writeFile("./db/notes.json", JSON.stringify(parsedNotes, null, 4), (err) => {
    console.log(parsedNotes)
        });

})

}

});

//listens to PORT
app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`));


