const mongoose = require('mongoose')

const kveris = {
    type: 'Set up a private limited company',
    preferredCompanyName: 'mastis',
    alternativeCompanyName: 'mastis2',
    typeOfCompany: 'LTD',
    natureOfBusiness: 'swx',
    email: 'rytisvenslovas@gmail.com',
    telephone: '07708404081',
    companyAdress: '31 Cheshire Close',
    companyPostcode: 'CR4 1XF',
    numberOfShares: '100',
    valueOfAllShares: '100',
    numberOfShareHolders: 1,
    shareHolders: [
      {
        shareholder: 1,
        position: 'Director',
        numberOfShares: '10',
        name: 'Rytis Venslovas',
        surname: 'swxxx',
        dateOfBirth: '05/08/1990',
        NINnumber: 'asdfasdsdsa',
        UTRnumber: 'sadsadsadsdas',
        nationality: 'sdadasdasd',
        email: 'rytisvenslovas@gmail.com',
        phonenumber: '+31687267997',
        address: '31 Cheshire Close',
        postcode: 'CR41XF',
        homeTown: 'Mitcham',
        mothersMaidenName: 'sadasdsadsadsa',
        fathersName: 'sadasdsadsadsa',
        file: ''
      }
    ],
    confirmed: true,
    message: 'adsdsadsadasdasds'
  }
  

const newCompanyEstablishQueriesSchema = mongoose.Schema({

    id: String,
    type: String,
    date: String,
    name: String,
    preferredCompanyName: String,
    alternativeCompanyName: String,
    typeOfCompany: String,
    natureOfBusiness: String,
    email: String,
    telephone: String,
    companyAdress: String,
    companyPostcode: String,
    numberOfShares: String,
    valueOfAllShares: String,
    numberOfShareHolders: Number,
    shareHolders: [Object],
    confirmed: Boolean,
    message: String
    
    //reikalingas kazkoks tai id kad susieti su failais dropboxe
})



module.exports = mongoose.model("newCompanyEstablishQueries", newCompanyEstablishQueriesSchema)




//datos reike prie kiekvien query!!!!


// visada istrinti .env failiuka