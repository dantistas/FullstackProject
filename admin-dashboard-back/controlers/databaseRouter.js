const databaseRouter = require('express').Router();
const objectId = require('mongodb').ObjectID
const client = require('../models/clients') //perasyti is klients i klient
const { Dropbox } = require('dropbox');
const dbx = new Dropbox ({ accessToken: process.env.DROPBOX_ACCESS_TOKEN  })

const moveFilesFromToBeConfirmedToClientsFolder = async (toBeConfirmedId, clientId) => {

    const files =  await dbx.filesListFolder({
        path: `/ToBeConfirmed/${toBeConfirmedId}`
      }).then((res) =>{
        return res.result.entries.map((entrie)=>{
            return {
                from_path: `/ToBeConfirmed/${toBeConfirmedId}/${entrie.name}`,
                to_path: `/Clients/${clientId}/${entrie.name}`
            }
        })
      })

    const moveFiles = await dbx.filesMoveBatchV2({entries: files, autorename: true})
    const { async_job_id } = moveFiles.result

    if (async_job_id) {
        do {
        checkIfFilesWereMoved = await dbx.filesMoveBatchCheckV2({ async_job_id })
        // console.log(checkIfFilesWereMoved.result['.tag'])
        } while (checkIfFilesWereMoved.result['.tag'] === 'in_progress')
        // console.log(checkIfFilesWereMoved.result)
        const filesWereMoved = checkIfFilesWereMoved.result.entries.filter((entrie)=>{if(entrie['.tag'] === 'success'){return entrie} })
        
        if(filesWereMoved.length === files.length){
          const eraseFolder =  await dbx.filesDeleteV2({
                path: `/ToBeConfirmed/${toBeConfirmedId}`
            })

            return {success: `Client ${clientId} was sucessfully created,  ${filesWereMoved.length} files were moved to /Clients/${clientId} and folder ${eraseFolder.result.metadata.path_display} was deleted.`}
        }else{
            return {error: `error: ${filesWereMoved.length} files were moved out of ${files.length} try to do it manualy from /ToBeConfirmed/${toBeConfirmedId} to /Clients/${clientId}` }
        }
    }


    

}

  
databaseRouter.get('/', async (req,res)=>{
    const allClients = await client.find({})
    res.send(allClients)
})

databaseRouter.post('/', async (req, res)=>{
    const toBeConfirmedId = req.body.id
    let message = {
        client: "",
        notification:""
    }

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
    message.client = savedClient


     // // // cia logika dropbokso

    if(toBeConfirmedId ){  
        message.notification = await moveFilesFromToBeConfirmedToClientsFolder(toBeConfirmedId, savedClient._id)
    }else{
      await dbx.filesCreateFolderV2({
          path: `/Clients/${savedClient._id}`
      }).then((res)=>{
          message.notification = {success: `${savedClient._id}, Client ${savedClient.requiredInformation.name} was created. Dropbox folder for client was created ${res.result.metadata.path_display} .`}
      }).catch((err)=>{
          message.notification = {error: `Something went wrong ${err}`}
          console.log(err)
      })
    }

    res.send(message)

})

databaseRouter.post('/:id', async (req, res)=>{
    let message = {
        client: "",
        notification:""
    }
    
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
    
    message.notification = {success: `${updatedClient.requiredInformation.name} ${updatedClient._id} was succesfully updated.`}
    message.client = updatedClient

    res.send(message)
})

databaseRouter.delete('/:id', async (req,res) => {
    let message = {
        notification: ''
    }

    const deletedClient = await client.deleteOne({"_id": objectId(req.params.id)})

    if(deletedClient.deletedCount > 0){
        await dbx.filesDeleteV2({
            path: `/clients/${req.params.id}`
        }).then((result)=>{
            console.log(result)
            message.notification = {success: ` id: ${req.params.id} was deleted succesfully, ${deletedClient.deletedCount} item(s) was deleted dropbox: ${result.status}` }
        }).catch((err)=>{
            console.log({error:err})
            message.notification = {error: `${req.params.id} failed to delete this entry` }
        })
    }else {
        message.notification = {error: `${req.params.id} failed to delete this entry` }
    }

    res.send(message)

    // const response = (deletedCount) => {

    //     if(deletedCount > 0 ){
    //        await dbx.filesDeleteV2({
    //             path: `/clients/${req.params.id}`
    //           }).then((result) =>{
    //             message.notification = {success: ` id: ${req.params.id} was deleted succesfully, ${deletedCount} item(s) was deleted dropbox: ${result.data}` }
    //           }).catch((err)=>{console.log(err)})
    //     }else {
    //         message.notification = {error: `${req.params.id} failed to delete this entry` }
    //     }
    //     res.send(message)
    // }

    // await client.deleteOne({"_id": objectId(req.params.id)}).then((result)=>{
    //      response(result.deletedCount)
    // }).catch((err)=>{
    //     console.log({error: `Error: ${err}`})
    // })
})

module.exports = databaseRouter