const path = require('path')
const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {
  env
} = require("./src/environment/environment");

const app = express()
app.use(cors());
const routes = require("./route");
const http = require("http");
const server = http.createServer(app)

var io = require('socket.io')(server, {
  cors: { origin: '*' }
});
var clientIo = require('socket.io-client');
var clientSocket = clientIo.connect('localhost:8000');
// var realTime = require("./src/app/modules/socket/realTime");
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '/public')
app.use(express.static(publicDirectoryPath))
const helmet = require('helmet')
var xss = require("xss");
app.use(helmet.xssFilter())
app.use(helmet.frameguard())
var html = xss('<script>alert("xss");</script>');
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Database Connected");
  })
  .catch((error) => {
    console.log("MONGO DB ", error);
  });

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// realTime(io);

app.use('/api/users', function (req, res, next) {
  req.io = clientSocket;
  next();
})


app.use('/api/chats', function (req, res, next) {
  req.io = clientSocket;
  next();
})


app.get('/', function (req, res) {
  res.status(200).send("Welcome to chat App");
});


routes.map(route => {
  app.use(route.path, route.handler);
});


server.listen(port, () => {
  console.log(`Server started at  ${port}, ${process.env.NODE_ENV}, Database - ${process.env.MONGODB_URI}`);
});



