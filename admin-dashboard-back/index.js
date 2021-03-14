const  express = require('express');
const  cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const path = require('path')
const newQueriesRouter = require('./controlers/newQueriesRouter');
const databaseRouter = require('./controlers/databaseRouter');
const userRouter = require('./controlers/usersRouter');
const loginRouter = require('./controlers/loginRouter')


const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

//kazka pisa prota mongodb .env


const app = express();

app.use(cors());
app.use(express.static('build')); // build <<----
app.use(express.json());

app.use('/api/new-queries', newQueriesRouter)
app.use('/api/database', databaseRouter)
app.use('/create-user', userRouter)
app.use('/api/login', loginRouter)

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(`${__dirname}/build`, 'index.html'))
})




const port = process.env.PORT || 3001 ;

app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
  });