const newQueriesRouter = require('express').Router();
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

module.exports = newQueriesRouter