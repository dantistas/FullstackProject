const  express = require('express');
const fileUpload = require('express-fileupload');
const  cors = require('cors');
require('dotenv').config();
const nodemailer = require("nodemailer");
const servicesDB =require('./data/services.json');
const { json } = require('express');

const app = express();

app.use(fileUpload());
app.use(cors());
app.use(express.static('build')); // build <<----
app.use(express.json());

const port = process.env.PORT || 3001 ;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL, // sender address/ company name
    pass: process.env.PASS,
  },
});

const messageToCompany = (values, files) => {
  console.log("???",files)
  // const{type, name, email, telephone, message} = values
  // Object.keys(values).forEach((key)=>{console.log(key, values[key])})

  const emailPattern = {
    from: process.env.EMAIL, // sender address/ company name
    to: "testastestauskas@yandex.com", // list of receivers
    subject: `Message from: ${values.email}, Subject: ${values.type}`, // Subject line
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

app.get('/api/services', (req,res)=>{
  res.json(servicesDB)  //<<---- servicesDB
})


app.post('/swx', async (req, res)  => {
  const values = JSON.parse(req.body.values)
  let files = []

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
  // const toClient = messageToClient(req.body)

  await transporter.sendMail(toCompany,(err)=>{
    if(err){
      console.log(err)
      res.json({error:"Something went wrong, please try again later or call us +447450 225 137"})      // kazka sugalvoti su siuo erroru, kad nesiustu useriui
    }else{
      res.json({successful:`Thank you, we have successfuly received your message!`})
    }
  });
  // res.json(JSON.parse(req.body.values))
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
});



// karocia cia jau kitas  json


[
  {
      "service": "Taxation",
      "description": "Our objective is to work closely with you in order for you to pay minimum tax required by law. We will help you to plan your budget so you can carry out your matters in tax efficient way. We will help you to identify areas where we can assist in minimizing your tax liability or making improvements in identified areas. We will walk through with you so you can understand financial aspects within your business which will help you to plan for the future. We will help you with all needed registration in order for you to start working - either it is limited company or personal tax matters."
  },
  {
      "service": "Self – assessments",
      "description": "We can complete your tax returns ensuring they meet all compliance requirements. We can provide advice on most aspects of personal taxation. We will prepare accounts to help in completion of self-assessment tax returns and submit it with tax authorities. We will go through all computation of tax liabilities so you can understand how tax liabilities are calculated. We will help you dealing with tax enquiries or any correspondence with HMRC. In an unfortunate event of HMRC penalty which is not a pleasant experience, we will help you to minimize these penalties."
  },
  {
      "service": "VAT",
      "description": "We can advise and complete your VAT returns by also helping you to understand the complex area of VAT providing our efficient and cost-effective VAT service. Mistakes in VAT returns can be expensive for business. Therefore, we will take away stress for completing VAT returns. We will register, prepare, investigate, plan and advice on most of VAT matters. We will implement most beneficial VAT strategy for your business."
  },
  {
      "service": "Business start-up",
      "description": "We can help you to decide which business structure is most suitable for you by completing any registration procedures with Companies House and HM Revenue & Customs. We will help you to decide most suitable business structure and will deal with secretarial issues. We will help with all aspects of business compliance and administration."
  },
  {
      "service": "Bookkeeping",
      "description": "All businesses recognize the importance of maintaining accurate books and records in order to meet regulatory requirements, however many of the businesses find themselves unable to carry out these tasks themselves, that's why we are here to help. We will be on top of your bookkeeping, VAT, payroll and other accounting requirements also helping with most aspects of your company administration and compliance. We will tailor reports to individual requirements and provide with right amount of useful information."
  },
  {
      "service": "Payroll & CIS",
      "description": "We will deal with payroll operations on your behalf. We will process and report real time filling with HMRC and pension authorities. We will help you to understand how payroll works and will provide you all needed documentation: pay slips, P60, P32, subcontractor pay slips, etc. As most of our clients come from construction industry background, we have strong knowledge of it. We do help with all essential CIS registrations and submissions needed for your business to operate."
  },
  {
      "service": "Consultation",
      "description": "Our goal is to get to know your business better so we can offer the best advice. We try to do more than completing relevant paperwork, we will give you advice on your tax positions and liabilities, we will consult on most accountancy matters. We will help you to plan your personal and business taxes, giving you most tax efficient strategies for profit extractions or remunerations."
  }
]