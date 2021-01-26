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
  // console.log(values)
  // const{type, name, email, telephone, message} = values
  // Object.keys(values).forEach((key)=>{console.log(key, values[key])})

  const emailPattern = {
    from: process.env.EMAIL, // sender address/ company name
    to: "testastestauskas@yandex.com", // list of receivers
    subject: `Message from: ${values.email}, Subject: ${values.type}`, // Subject line
    html: `<b>name: ${values.name}</b><br/><b> Phone: ${values.telephone}</b><br/><b> E-mail: ${values.email}</b><br/><p>${values.message}<p/><br/><p>${JSON.stringify(values, undefined,2)}</p>`, // html body
    replyTo: values.email // reply to option
    
  }

  if(files && files.length > 0){
    emailPattern.attachments = []
    for(let i =0 ; i<files.length ; i++){
      emailPattern.attachments.push({fileName: files[i].name, path: `${__dirname}/uploads/${files[i].name}`})
    }
  }else if (files){
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
      res.json({Error:err})      // kazka sugalvoti su siuo erroru, kad nesiustu useriui
    }else{
      res.json(`Thank you ${req.body.name}, your message was succesfuly sent!`)
    }
  });
  res.json(JSON.parse(req.body.values))
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
});




// req.body shareholderiouse rodo object object. patvarkyti ten biski failai veike puikeusei.
