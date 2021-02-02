const mongoose = require('mongoose')


const kveris = {
    type: 'Self-employment queries',
    name: 'Rytis Venslovas',
    surname: 'Venslovas',
    email: 'rytisvenslovas@gmail.com',
    telephone: '+31687267997',
    address: '31 Cheshire Close',
    postcode: 'CR41XF',
    dateOfBirth: '1190-25-20',
    UTRnumber: 'assdsad',
    NINnumber: 'sadasdasdas',
    file: '',
    message: 'sadsadasdasd'
  }
  

const selfEmployedQueriesSchema = mongoose.Schema({
    id: String,
    type: String,
    name: String,
    surname: String,
    email: String,
    telephone: String,
    address: String,
    postcode: String,
    dateOfBirth: String,
    UTRnumber: String,
    NINnumber: String,
    message: String,


    //reikalingas kazkoks id kad susiet su drop boxo failais
})



module.exports = mongoose.model("selfEmployedQueries", selfEmployedQueriesSchema)