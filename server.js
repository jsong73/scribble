const express = require("express");
const path = require("path");
//use preconfigured port ; if none go to default specified 3001 port
const PORT = process.env.PORT || 3001;

const app = express();

//For POST and PUT requests for sending data to the server
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//when user goes to the / url then it will take them to the index.html page
app.get("/", (req, res) =>
 res.sendFile(path.join(__dirname, "/public/index.html"))
);


//allowing express access to the public folder 
app.use(express.static("public"));


app.listen(PORT, () =>
console.log(`Listening for requests on port ${PORT}!`));