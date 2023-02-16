const express = require("express");
const port = 3000;
const path = require("path");
//a function that we will call to return an express applocation instance
const app = express();

//middleware function
//any http method/request will use this millware function
app.use((req, res, next) => {
  console.log(req.method, req.url, new Date().toLocaleDateString());
  //if we want it to continue, we call next --> next middleware that can send a response and end it
  next();
});
app.get("/", (req, res) => {
  //res.send will automatically assign the contenet-type, by default the status code would be 200 and we wouldn't need to end the response
  //res.send("<h1>Hello World</h1>");
  //sendFile will take in a filePath from where it would read from and send the response back as a stream
  //writes it because respons is a writeable stream
  //sendFile needs an absolute path
  //sendFile will handle creating the read stream from the filepath, it will handle piping the result to the response, it will handle the content type, the statuscode and ending the response when the stream is ended
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/about", (req, res) => {
  res.json({ message: "Hello, My name is Arna" });
});

app.listen(port, () => {
  console.log(`Sever running is ${port}`);
});
