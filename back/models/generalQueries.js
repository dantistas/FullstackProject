const mongoose = require('mongoose')


const generalQueriesSchema = mongoose.Schema({
    id: String,
    type: String,
    name: String,
    email: String,
    telephone: String,
    message: String
    
    //reikalingas kazkoks tai id kad susieti su failais dropboxe
})



module.exports = mongoose.model("generalQueries", generalQueriesSchema)