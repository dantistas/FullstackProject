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
    type:"OAuth2",
    user: process.env.EMAIL, // sender address/ company name
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET
  },
});

const messageToCompany = (values, files) => {
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