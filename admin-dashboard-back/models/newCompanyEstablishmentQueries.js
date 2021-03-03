const mongoose = require('mongoose')


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

})



module.exports = mongoose.model("newCompanyEstablishQueries", newCompanyEstablishQueriesSchema)
