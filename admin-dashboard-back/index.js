const  express = require('express');
const  cors = require('cors');
const mongoose = require('mongoose');
const newQueriesRouter = require('./controlers/newQueries');


const MONGODB_URI = "mongodb+srv://rytis:rytis123@cluster0-dihxu.mongodb.net/Books?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const app = express();

app.use(cors());
// app.use(express.static('build')); // build <<----
app.use(express.json());

app.use('/api/new-queries', newQueriesRouter)


const port = process.env.PORT || 3001 ;

app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
  });