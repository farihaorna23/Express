const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

//a middleware that will pass in another middleware express.json()
//expression.json() will listen for json, coming to the server as request body
//and will parses the the request body and assigns it to a property in the request object named body
//for every request method, it is going to parse the request body
app.use(express.json());

//morgan logs important information about the request
//example- url, method, statuscode
//Example:
// GET / 200 14.985 ms - 31
// GET /favicon.ico 404 2.465 ms - 150
// GET /about 200 0.712 ms - 32
app.use(morgan("dev"));

app.get("/", (req, res) => {
  //read files from the filename
  //sends the content as response like piping
  //response and request object are both readable and writeable stream
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/about", (req, res) => {
  //sending json data
  //we can send res.end if we don't want to send any data back
  res.json({ message: "For the about page", query: req.query });
});

app.post("/signup/:secret", (req, res) => {
  //without express and with only node, we would have to listen for the data, collect the chunks in an array
  //convert the buffer to string and parse to access
  //JSON.parse(Buffer.concat(chunks).toString())
  //but with the help of express.json() we don't have to do a lot
  res.json({
    message: `${req.body.name}, Thank You for Signing Up!`,
    secret: req.params.secret
  }); //Fariha, whatever is beside the url
});

app.listen(3000, () => console.log("Sever 3 is running"));
