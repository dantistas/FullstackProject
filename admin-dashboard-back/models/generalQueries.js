const mongoose = require('mongoose')


const generalQueriesSchema = mongoose.Schema({
    id: String,
    date: String,
    type: String,
    name: String,
    email: String,
    telephone: String,
    file: String,
    message: String
    
})



module.exports = mongoose.model("generalQueries", generalQueriesSchema)