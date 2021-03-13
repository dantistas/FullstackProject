const swxRouter = require('express').Router();
const generalQueries = require('../models/generalQueries') // gali but kad situos kverius reikes sukelti i atskira foldery
const selfEmployedQueries = require('../models/selfEmployedQueries')
const companyMattersQueries = require('../models/companyMattersQueries')
const newCompanyEstablishQueries = require('../models/newCompanyEstablishmentQueries')
const { Dropbox } = require('dropbox');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require('fs')
const path = require('path')

swxRouter.use(fileUpload())
const dbx = new Dropbox ({ accessToken: process.env.DROPBOX_ACCESS_TOKEN })



const deleteFiles = (files) => {
    if(files){
      for(let i = 0; i< files.length; i++){
        console.log(files[i].name)
        fs.unlink(`${__dirname}/uploads/${files[i].name}`, (err) => {
          if (err) {
            console.log(err)
            return
          }
          //file removed
        })                          
      }
    }
  }
  
  
  const htmlGenerator = (values) => {
   if(values.type === "General queries"){
     return `<b>Name: ${values.name}</b><br><b>E-mail: ${values.email}</b><br><b>Telephone: ${values.telephone}</b><br><b>message: ${values.message}</b><br>`
   }else if (values.type === "Set up a private limited company"){
    return `visi values is values`
   }else if (values.typ === "Company matters"){
    return `visi values is company matters values`
   } else if ( values.type === "Self-employment queries"){
     return `visi values is sio queries`
   }
  }
  
  
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type:"OAuth2",
      user: process.env.EMAIL, // sender address/ company name
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET
    },
  });
  
  const messageToCompany = (values, files) => {

    const emailPattern = {
      from: process.env.EMAIL, // sender address/ company name
      to: process.env.EMAIL_TO_ADMIN , // list of receivers
      subject: `Subject: ${values.type}, Message from: ${values.email}`, // Subject line
      html: `<b>name: ${values.name}</b><br/><b> Phone: ${values.telephone}</b><br/><b> E-mail: ${values.email}</b><br/><p>${values.message}<p/><br/><p>${JSON.stringify(values, undefined,2)}</p>`, // html body
      replyTo: values.email // reply to option
    }
  
    if(files && files.length > 1){
      emailPattern.attachments = []
      for(let i =0 ; i<files.length ; i++){
        emailPattern.attachments.push({fileName: files[i].name, path: `${__dirname}/uploads/${files[i].name}`})
      }
    }else if (files.length === 1){
      emailPattern.attachments = []
      emailPattern.attachments.push({fileName: files[0].name, path: `${__dirname}/uploads/${files[0].name}`})
    }
  
    return emailPattern
  }
  
  const messageToClient = (elements) => {
    const{subject, name, email,phonenumber, body} = elements
    return {
      from: process.env.EMAIL, // sender address/ company name
      to: email, // list of receivers
      subject: `Mastis.co.uk - Dont reply!`, // Subject line
      html: `<p>Hi ${name},</p><br/><p>We have succesfully received your message, and will contact you ASAP!!!!<p/><br/><h1>Mastis.co.uk<h1/>` // html body
    }
  }


swxRouter.post('/', async (req, res)  => {
    const values = JSON.parse(req.body.values)
    let files = []
    let query 

    if(values.type === "General queries"){
        query = new generalQueries({
            type: values.type,
            date: values.date,
            name: values.name,
            email: values.email,
            telephone: values.telephone,
            file: values.file || "no file",
            message: values.message
        })
    }else if (values.type === "Self-employment queries" ){
      query = new selfEmployedQueries({
          type: values.type,
          date: values.date,
          name: values.name,
          surname: values.surname,
          email: values.email,
          telephone: values.telephone,
          address: values.address,
          postcode: values.postcode,
          dateOfBirth: values.dateOfBirth,
          UTRnumber: values.UTRnumber || "no entry",
          NINnumber: values.NINnumber || "no entry",
          file: values.file || "no file",
          message: values.message
      })
    }else if(values.type === "Company matters"){
      query = new companyMattersQueries({
        type: values.type,
        date: values.date,
        name: values.name,
        companyName: values.companyName,
        companyNumber: values.companyNumber,
        email: values.email,
        telephone: values.telephone,
        VATNumber: values.VATNumber || "no entry",
        UTRNumber: values.UTRNumber || "no entry",
        file: values.file || "no file",
        message: values.message
      })
    }else if (values.type === "Set up a private limited company"){
      query = new newCompanyEstablishQueries({
        type: values.type,
        date: values.date,
        name: values.name,
        preferredCompanyName: values.preferredCompanyName,
        alternativeCompanyName: values.alternativeCompanyName,
        typeOfCompany: values.typeOfCompany,
        natureOfBusiness: values.natureOfBusiness,
        email: values.email,
        telephone: values.telephone,
        companyAdress: values.companyAdress,
        companyPostcode: values.companyPostcode,
        numberOfShares: values.numberOfShares,
        valueOfAllShares: values.valueOfAllShares,
        numberOfShareHolders: values.numberOfShareHolders,
        shareHolders: values.shareHolders,
        confirmed: values.confirmed,
        message: values.message || "no entry"
      })
    }

    const savedQuery = await query.save()
    // res.json({successful:`Thank you for your enquiry. Your message has been sent successfully. ---->>${savedQuery}`})
  
    if(req.files && req.files.file.length > 0){
      for(let i = 0; i< req.files.file.length; i++){
        dbx.filesUpload({path: `/ToBeConfirmed/${savedQuery._id}/${req.files.file[i]}` , contents: req.files.file[i].data }).then(res=>console.log(res))  // <<<---- sitas veike jau normalei jei ka https://github.com/andreafabrizi/Dropbox-Uploader/issues/514
        files.push(req.files.file[i])                            // sito greiciausiai, kad nereikes, nes viskas eis i dropboxa   
        files[i].mv(`${__dirname}/uploads/${files[i].name}`)  // sito greiciausiai, kad nereikes, nes viskas eis i dropboxa
      }
    } else if (req.files){
      dbx.filesUpload({path: `/ToBeConfirmed/${savedQuery._id}/${req.files.file.name}` , contents: req.files.file.data }).then(res=>console.log(res))  // <<<---- sitas veike jau normalei jei ka https://github.com/andreafabrizi/Dropbox-Uploader/issues/514
      files.push(req.files.file)                              // sito greiciausiai, kad nereikes, nes viskas eis i dropboxa
      files[0].mv(`${__dirname}/uploads/${files[0].name}`)   // sito greiciausiai, kad nereikes, nes viskas eis i dropboxa
    }

  
   dbx.filesUpload({
     
   })


    const toCompany = messageToCompany(values, files)
    const toClient = messageToClient(req.body) //sitas bus klientuj.
  
    await transporter.sendMail(toCompany,(err)=>{
      if(err){
        console.log(err)
        res.json({error:"Something went wrong, please try again later or call us."})      // kazka sugalvoti su siuo erroru, kad nesiustu useriui sita galima padaryti kad man tiesei i emaila atsisutu asmensikai
      }else{
        res.json({successful:`Thank you for your enquiry. Your message has been sent successfully.`})
        deleteFiles(files)
      }
    });
  
    // res.json({successful:`Thank you for your enquiry. Your message has been sent successfully.`})
  });



  module.exports = swxRouter