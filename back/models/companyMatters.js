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
  


const companyMattersSchema = mongoose.Schema({
    id: String,
    type: String,
    companyName:String,
    companyNumber: String,
    email: String,
    telephone: String,
    VATNumber: String,
    UTRNumber: String,
    message: String,


    //reikalingas name
    //reikalingas kazkoks tai id kad susieti su failais dropboxe
})



module.exports = mongoose.model("companyMatters", companyMattersSchema)