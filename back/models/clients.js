const mongoose = require('mongoose')


  const clientsSchema  = mongoose.Schema({
      id:String,
      requiredInformation: {
            name: String,
            clientType: String,
            manager: String,
            bankName: String,
            sortCode: String,
            accountNumber: String,
            iban: String
      },
      companyDetails: {
        companyNumber: String,
        companyStatus: String,
        incorporationDate: String,
        registeredAddress: String,
        companyPostalAddress: String,
        companyEmail: String,
        sicCode: String,
        natureOfBusiness: String,
        companyUtr: String,
        companiesHouseAuthentificationNumber: String,
        disolvedOn: String,
        companyUtr: String
      },
      mainContact: {
        firstName: String,
        middleName: String,
        lastName: String,
        dateOfBirth: String,
        deceased: String,
        email: String,
        telephone: String,
        ninNumber: String,
        utrNumber: String,
        idVerified: String,
        maritalStatus: String,
        nationality: String,
      },
      accountsAndReturnsDetails: {
        companiesHouseYearEnd: String,
        latestAction: String,
        hmrcYearEnd: String,
      },
      confirmationStatement: {
        confirmationStatementDate: String,
        shareCapital: String,
        shareholder: String,
        peopleWithSignificantControl: String,
        latestAction: String
      },
      vatDetails: {
        vatFrequency: String,
        vatPeriodEnd: String,
        latestAction: String,
        vatNumber: String,
        eoriNumber: String,
        vatAddress: String,
        dateOfRegistration: String,
        effectiveVatDate: String,
        estimatedTurnover: String,
        mtd: String,
        box5LastQuarterSubmitted: String,
        vatDeregistrationDate: String
      },
      payeDetails: {
        employersReference: String,
        accountsOfficeRefference: String,
        pensionProvider: String,
        pensionId: String,
        declarationOfComplianceSubmission: String,
        p11d: String,
        cis: String
      },
      agentAuthorization: {
        corporationTax: String,
        paye: String,
        cis: String
      },
      comments: [Object],
      date: String,


  })


  clientsSchema.set('toJSON',{
    transform:((document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete comments
        delete agentAuthorization
        delete payeDetails
        delete mainContact
        delete companyDetails
      })
  })

  module.exports = mongoose.model("clients", clientsSchema)