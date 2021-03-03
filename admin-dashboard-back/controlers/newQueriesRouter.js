const newQueriesRouter = require('express').Router();
const objectId = require('mongodb').ObjectID

const { Dropbox } = require('dropbox');
const dbx = new Dropbox ({ accessToken: process.env.DROPBOX_ACCESS_TOKEN })

const generalQueries = require('../models/generalQueries')
const companyMattersQueries = require('../models/companyMattersQueries')
const selfEmployedQueries = require('../models/selfEmployedQueries')
const newCompanyEstablishmentQueries = require('../models/newCompanyEstablishmentQueries')





newQueriesRouter.get('/', async (req, res)=>{
    let newQueries = {
        generalQueries: await generalQueries.find({}),
        companyMattersQueries: await companyMattersQueries.find({}),
        selfEmployedQueries: await selfEmployedQueries.find({}),
        newCompanyEstablishmentQueries: await newCompanyEstablishmentQueries.find({})
    }

    res.json(newQueries) 
})

newQueriesRouter.delete('/:type/:id', async (req, res) => {
    const response = (deletedCount) => {
        let message = {
            database: '',
            dropbox: '',
        }
        if(deletedCount > 0 ){
            message.database = ` id: ${req.params.id} was deleted succesfully, ${deletedCount} item(s) was deleted`,
            dbx.filesDeleteV2({
                path: `/ToBeConfirmed/${req.params.id}`
              }).then((result) =>{
                message.dropbox = result.status
              }).catch((err)=>{console.log(err)})
        }else {
            message.database = `${req.params.id} failed to delete this entry`
        }
        res.send(message)
    }

    switch(req.params.type){
        case 'Company matters':
            await companyMattersQueries.deleteOne({"_id": objectId(req.params.id)}).then((result)=>{
                response(result.deletedCount)
            }).catch((err)=>{
                console.log("error: ", err)
            })
            break
        case 'General queries':
            await generalQueries.deleteOne({"_id": objectId(req.params.id)}).then((result)=>{
                response(result.deletedCount)
            }).catch((err)=>{
                console.log("error: ", err)
            })
            break
        case 'Set up a private limited company':
            await newCompanyEstablishmentQueries.deleteOne({"_id": objectId(req.params.id)}).then((result)=>{
                response(result.deletedCount)
            }).catch((err)=>{
                console.log("error: ", err)
            })
            break
        case 'Self-employment queries':
            await selfEmployedQueries.deleteOne({"_id": objectId(req.params.id)}).then((result)=>{
                response(result.deletedCount)
            }).catch((err)=>{
                console.log("error: ", err)
            })
            break
        default:
            console.log({error: `wrong ${req.params.id}`})
    }
})

module.exports = newQueriesRouter

