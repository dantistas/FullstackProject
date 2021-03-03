const mongoose = require('mongoose')


const selfEmployedQueriesSchema = mongoose.Schema({
    id: String,
    type: String,
    date: String,
    name: String,
    surname: String,
    email: String,
    telephone: String,
    address: String,
    postcode: String,
    dateOfBirth: String,
    UTRnumber: String,
    NINnumber: String,
    file: String,
    message: String,

})



module.exports = mongoose.model("selfEmployedQueries", selfEmployedQueriesSchema)