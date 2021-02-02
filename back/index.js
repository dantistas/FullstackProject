const  express = require('express');
// const fileUpload = require('express-fileupload');
const  cors = require('cors');
// require('dotenv').config();
// const nodemailer = require("nodemailer");
const servicesDB =require('./data/services.json');
// const fs = require('fs')
const mongoose = require('mongoose');
const { json } = require('express');
const swxRouter = require('./controlers/swx')


//mongodb 
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// app 
const app = express();

app.use(cors());
app.use(express.static('build')); // build <<----
app.use(express.json());

const port = process.env.PORT || 3001 ;

app.use('/swx', swxRouter )


app.get('/api/services', (req,res)=>{
  res.json(servicesDB)  //<<---- servicesDB
})


app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
});