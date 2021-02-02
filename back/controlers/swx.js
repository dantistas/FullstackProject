const swxRouter = require('express').Router();
const generalQueries = require('../models/generalQueries')
const fileUpload = require('express-fileupload');
require('dotenv').config();
const nodemailer = require("nodemailer");
const fs = require('fs')

swxRouter.use(fileUpload())

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
    // const{type, name, email, telephone, message, shareHolder} = values
    // Object.keys(values).forEach((key)=>{console.log(key, values[key])})
    console.log("message : ", typeof values)
    
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
    
    if(values.type === "General queries"){
        const query = new generalQueries({
    
            type: values.type,
            name: values.name,
            email: values.email,
            telephone: values.telephone,
            message: values.message
        })
        const savedQuery = await query.save()
        res.json({successful:`Thank you for your enquiry. Your message has been sent successfully.`})
    }
  
    if(req.files && req.files.file.length > 0){
      for(let i = 0; i< req.files.file.length; i++){
        files.push(req.files.file[i])                              
        files[i].mv(`${__dirname}/uploads/${files[i].name}`)
      }
    } else if (req.files){
      files.push(req.files.file)
      files[0].mv(`${__dirname}/uploads/${files[0].name}`)
    }

    const toCompany = messageToCompany(values, files)
    const toClient = messageToClient(req.body) //sitas bus klientuj.
  
    // await transporter.sendMail(toCompany,(err)=>{
    //   if(err){
    //     console.log(err)
    //     res.json({error:"Something went wrong, please try again later or call us 07498 226576"})      // kazka sugalvoti su siuo erroru, kad nesiustu useriui sita galima padaryti kad man tiesei i emaila atsisutu asmensikai
    //   }else{
    //     res.json({successful:`Thank you for your enquiry. Your message has been sent successfully.`})
    //     deleteFiles(files)
    //   }
    // });
  
    // res.json({successful:`Thank you for your enquiry. Your message has been sent successfully.`})
  });



  module.exports = swxRouter