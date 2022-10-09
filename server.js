const express = require('express');
const bodyParser= require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const dotenv = require('dotenv')


const connectDB = require('./config/db')  

dotenv.config({path: './config/config.env'});

connectDB();

app.use('/', require('./routes/index'))

app.listen(4000, function() {
  console.log('listening on 4000')
})
