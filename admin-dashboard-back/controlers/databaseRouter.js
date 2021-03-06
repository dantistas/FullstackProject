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

            return `${filesWereMoved.length} files were moved to /Clients/${clientId} and folder ${eraseFolder.result.metadata.path_display} was deleted.`
        }else{
            return `error: ${filesWereMoved.length} files were moved out of ${files.length} try to do it manualy from /ToBeConfirmed/${toBeConfirmedId} to /Clients/${clientId}`
        }
    }


    

}

  
databaseRouter.get('/', async (req,res)=>{
    const allClients = await client.find({})
    res.send(allClients)
})

databaseRouter.post('/', async (req, res)=>{
    const toBeConfirmedId = req.body.id
    let answer = {
        client: "",
        dropbox: ""
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


     // // // cia logika dropbokso

    if(toBeConfirmedId ){
      answer.dropbox = await moveFilesFromToBeConfirmedToClientsFolder(toBeConfirmedId, savedClient._id)
      answer.client = savedClient
    }else{
      await dbx.filesCreateFolderV2({
          path: `/Clients/${savedClient._id}`
      }).then((res)=>{
        answer.dropbox = `Folder for client was created ${res.result.metadata.path_display}`
      }).catch((err)=>{
          console.log(err)
      })
    }

    res.send(answer)

    // // // cia logika dropbokso


    // res.send({successful: `${savedClient.requiredInformation.name} ${savedClient._id} was succesfully saved to database.`})


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