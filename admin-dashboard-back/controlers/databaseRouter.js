const databaseRouter = require('express').Router();
const objectId = require('mongodb').ObjectID
const client = require('../models/clients') //perasyti is klients i klient



// cia yra normalu ????  {
//     requiredInformation: {
//       name: 'asafafsa',
//       clientType: '',
//       manager: '',
//       bankName: '',
//       sortCode: '',
//       accountNumber: '',
//       IBAN: ''
//     },
//     companyDetails: {
//       companyNumber: '',
//       companyStatus: '',
//       incorporationDate: '',
//       registeredAddress: '',
//       companyPostalAddress: '',
//       companyEmail: '',
//       sicCode: '',
//       natureOfbusiness: '',
//       companyUTR: '',
//       companiesHouseAuthentificationNumber: '',
//       disolvedOn: ''
//     },
//     mainContact: {
//       firstName: '',
//       middleName: '',
//       lastName: '',
//       dateOfBirth: '',
//       deceased: '',
//       email: '',
//       telephone: '',
//       ninNumber: '',
//       utrNumber: '',
//       IDverified: '',
//       maritalStatus: '',
//       nationality: ''
//     },
//     accountsAndReturnsDetails: { companiesHouseYearEnd: '', HMRCyearEND: '', latestAction: '' },
//     confirmationStatement: {
//       confirmationStatementDate: '',
//       shareCapital: '',
//       shareholder: '',
//       peopleWithSignificantControl: '',
//       latestAction: ''
//     },
//     vatDetails: {
//       vatFrequency: '',
//       vatPeriodEnd: '',
//       latestAction: '',
//       vatNumber: '',
//       eoriNumber: '',
//       vatAddress: '',
//       dateOfregistration: '',
//       effectiveVatDate: '',
//       estimatedTurnover: '',
//       MTD: '',
//       box5LastQuarterSubmitted: '',
//       vatDeregistrationDate: ''
//     },
//     payeDetails: {
//       employersReference: '',
//       accountsOfficeRefference: '',
//       pensionProvider: '',
//       pensionID: '',
//       declarationOfComplianceSubmission: '',
//       P11D: '',
//       CIS: ''
//     },
//     agentAuthorization: { corporationTax: '', PAYE: '', CIS: '' },
//     date: 'Mon Mar 01 2021 13:46:28 GMT+0000 (Greenwich Mean Time)'
//   }
  
databaseRouter.get('/', async (req,res)=>{
    const allClients = await client.find({})
    res.send(allClients)
})

databaseRouter.post('/', async (req, res)=>{
    // const swx = await client.findOne({
    //     "mainContact.firstName": req.body.mainContact.firstName,
    //     "mainContact.middleName": req.body.mainContact.middleName,
    //     "mainContact.lastName": req.body.mainContact.lastName
    // })
    console.log("cia yra normalu ???? ",req.body)
    const clientToDB = new client({
        requiredInformation: req.body.requiredInformation,
        companyDetails: req.body.companyDetails,
        mainContact: req.body.mainContact,
        accountsAndReturnsDetails: req.body.accountsAndReturnsDetails,
        confirmationStatement: req.body.confirmationStatement,
        vatDetails: req.body.vatDetails,
        payeDetails: req.body.payeDetails,
        agentAuthorization: req.body.agentAuthorization,
        date: req.body.date
    })
    const savedClient = await clientToDB.save()


    res.send({successful: `${savedClient.requiredInformation.name} ${savedClient._id} was succesfully saved to database.`})
    // res.send({successful: `${swx}`})


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
        date: req.body.date
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