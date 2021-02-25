const mongoose = require('mongoose')


const kveris = {
    requiredInformation = {
        name:"string",
        clientType:"string",
        manager:"string",
        bankName:"string",
        sortCode:"string",
        accountNumber:"string",
        IBAN:"string"
    },
    companyDetails={
        companyNumber:"",
        companyStatus:"",
        incorporationDate:"",
        registeredAddress:"",
        companyPostalAddress:"",
        companyEmail:"",
        sicCode:"",
        natureOfbusiness:"",
        companyUTR:"",
        companiesHouseAuthentificationNumber:"",
        disolvedOn:"",
    },
    mainContact={
        firstName:"",
        middleName:"",
        lastName:"",
        dateOfBirth:"",
        deceased:"",
        email:"",
        telephone:"",
        ninNumber:"",
        utrNumber:"",
        IDverfied:"boelean",
        maritalStatus:"",
        nationality:"",
    },
    accountsAndReturnsDetails={
        confirmationStatementDate:"",
        shareCapital:"",
        peopleWithSignificantControl:"",
        latestAction:""
    },
    vatDetails={
        vatFrequency:"",
        vatPeriodEnd:"",
        latestAction:"",
        vatNumber:"",
        eoriNumber:"",
        vatAddress:"",
        dateOfregistration:"",
        effectiveVatDate:"",
        estimatedTurnover:"",
        MTD:"boelean",
        box5LastQuarterSubmitted:"",
        vatDeregistrationDate:""
    },
    payeDetails={
        employersReference:"",
        accountsOfficeRefference:"",
        pensionProvider:"",
        pensionID:"",
        declarationOfComplianceSubmission:"",
        P11D:"boolean",
        CIS:"Boolean",
    },
    agentAuthorization={
        corporationTax:"boolean",
        PAYE:"boolean",
        CIS:"boolean"
    }
  }
  

  const clientsSchema  = mongoose.Schema({
      id:String,
      requiredInformation: {
            name: String,
            clientType: String,
            manager: String,
            bankName: String,
            sortCode: String,
            accountNumber: String,
            IBAN: String
      },
      companyDetails: {
        companyNumber: String,
        companyStatus: String,
        incorporationDate: String,
        registeredAddress: String,
        companyPostalAddress: String,
        companyEmail: String,
        sicCode: String,
        natureOfbusiness: String,
        companyUTR: String,
        companiesHouseAuthentificationNumber: String,
        disolvedOn: String,
      },
      mainContact: {

      }


  })


  module.exports = mongoose.model("clients", clientsSchema)