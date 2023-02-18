const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
//importing router
const router = require("./routes/index.js");

app.use(express.json());

app.use(morgan("dev"));

//Routes -> specify that the app uses the router
app.use(router);

//Handle 404
//Handle any route that has made it to this point and the request url has not matched with any endpoints
//Handling request for routes that doesn't exist
app.use((req, res, next) => {
  try {
    //read the file and send the file to the client
    //set the status to 404
    res.status(404).sendFile(path.join(__dirname, "./public/notFound.html"));
  } catch (err) {
    //if there is an error while reading the file, pass the error to the next middleware function
    //middleware function will handle it
    next(err);
  }
});
//Handle Sever Errors
//at this point in the code, if I have not responded to the request, there must be an error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: "A an error has occured in the server" }, err);
});

app.listen(3000, () => console.log("Sever 4 is running"));
