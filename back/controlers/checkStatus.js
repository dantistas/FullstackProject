const checkStatusRouter = require('express').Router();
const clients = require('../models/clients')
const objectId = require('mongodb').ObjectID

checkStatusRouter.post('/', async (req,res) => {

   await clients.findOne({"_id": objectId(req.body.id)}).then((response)=>{
       if(response=== null){
        res.send("we did not find anyhing")
       }else{
        res.send(`AccountsAndReturnsDetails: ${response.accountsAndReturnsDetails.latestAction === "" ? "no info" : response.accountsAndReturnsDetails.latestAction }, VAT Details: ${response.vatDetails.latestAction === "" ? "no info" : response.vatDetails.latestAction }, Confirmation statement: ${response.confirmationStatement.latestAction === "" ? "no info" : response.confirmationStatement.latestAction}`)
       }
   })
})


module.exports = checkStatusRouter


//
