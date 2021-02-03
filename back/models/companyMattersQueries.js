const mongoose = require('mongoose')

const kveris = {
    type: 'Company matters',
    companyName: 'mastis',
    companyNumber: '1244455',
    email: 'rytisvenslovas@gmail.com',
    telephone: '07708404081',
    VATNumber: '1231124234235',
    UTRNumber: '3423423432',
    message: 'sweiki laba diena ',
    file: ''
  }
  


const companyMattersQueriesSchema = mongoose.Schema({
    id: String,
    type: String,
    date: String,
    name: String,
    companyName:String,
    companyNumber: String,
    email: String,
    telephone: String,
    VATNumber: String,
    UTRNumber: String,
    file: String,
    message: String,


    //reikalingas kazkoks tai id kad susieti su failais dropboxe
})



module.exports = mongoose.model("companyMattersQueries", companyMattersQueriesSchema)