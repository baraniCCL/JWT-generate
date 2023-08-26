const express = require('express');
const app = express();
const PORT = 8080;
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const mongoURL = process.env.DB_URL;
const router = require('./routes/router');
const bodyParser = require('body-parser');

const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(mongoURL);
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
connectToMongo();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', router);

app.get('/', (req, res) => {
  res.send('Hello');
})
app.listen(PORT, () => {console.log("port listening on: ", PORT);});