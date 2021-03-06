const databaseRouter = require('express').Router();
const objectId = require('mongodb').ObjectID
const client = require('../models/clients') //perasyti is klients i klient
const { Dropbox } = require('dropbox');
const dbx = new Dropbox ({ accessToken: process.env.DROPBOX_ACCESS_TOKEN  })

  
databaseRouter.get('/', async (req,res)=>{
    const allClients = await client.find({})
    res.send(allClients)
})

databaseRouter.post('/', async (req, res)=>{
    const id = req.body.id 

    const clientToDB = new client({
        requiredInformation: req.body.requiredInformation,
        companyDetails: req.body.companyDetails,
        mainContact: req.body.mainContact,
        accountsAndReturnsDetails: req.body.accountsAndReturnsDetails,
        confirmationStatement: req.body.confirmationStatement,
        vatDetails: req.body.vatDetails,
        payeDetails: req.body.payeDetails,
        agentAuthorization: req.body.agentAuthorization,
        date: req.body.date,
        comments: req.body.comments
    })
    const savedClient = await clientToDB.save()


     // // // cia logika dropbokso

    // const files =  await dbx.filesListFolder({
    //     path: `/ToBeConfirmed/${id}`
    //   }).then((res) =>{
    //     return res.result.entries
    //   }).catch((err)=>{console.log(err)})


    if(id ){
      await dbx.filesMoveBatchV2({
            entries:[{
              from_path: `/ToBeConfirmed/${id}`,
              to_path: `/swxx`
            }]
        }).then((res)=>{
            console.log("pavyko ???? ",res.result , "id: ",savedClient._id)
        }).catch((err)=>{
            console.log("kaip cia suprast naxui ????? ",err)
        })
    }else{
      await dbx.filesCreateFolderV2({
          path: `/Clients/${savedClient._id}`
      }).then((res)=>{
          console.log(res)
      }).catch((err)=>{
          console.log(err)
      })
    }



    // // // cia logika dropbokso


    res.send({successful: `${savedClient.requiredInformation.name} ${savedClient._id} was succesfully saved to database.`})


})

databaseRouter.post('/:id', async (req, res)=>{
    
    const request = {
        requiredInformation: req.body.requiredInformation,
        companyDetails: req.body.companyDetails,
        mainContact: req.body.mainContact,
        accountsAndReturnsDetails: req.body.accountsAndReturnsDetails,
        confirmationStatement: req.body.confirmationStatement,
        vatDetails: req.body.vatDetails,
        payeDetails: req.body.payeDetails,
        agentAuthorization: req.body.agentAuthorization,
        date: req.body.date,
        comments: req.body.comments
    }

    const updatedClient = await client.findOneAndUpdate(
        {
            "_id": objectId(req.params.id)
        },
        request
    )
    res.send({successful: `${updatedClient.requiredInformation.name} ${updatedClient._id} was succesfully updated.`})
})

databaseRouter.delete('/:id', async (req,res) => {
    const response = (deletedCount) => {
        let message = {
            database: '',
            dropbox: '',
        }
        if(deletedCount > 0 ){
            message.database = ` id: ${req.params.id} was deleted succesfully, ${deletedCount} item(s) was deleted`,
            dbx.filesDeleteV2({
                path: `/clients/${req.params.id}`
              }).then((result) =>{
                message.dropbox = result.status
              }).catch((err)=>{console.log(err)})
        }else {
            message.database = `${req.params.id} failed to delete this entry`
        }
        res.send(message)
    }

    await client.deleteOne({"_id": objectId(req.params.id)}).then((result)=>{
         response(result.deletedCount)
    }).catch((err)=>{
        console.log({error: `Error: ${err}`})
    })
})

module.exports = databaseRouter