const mongoose = require('mongoose')


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

})



module.exports = mongoose.model("companyMattersQueries", companyMattersQueriesSchema)