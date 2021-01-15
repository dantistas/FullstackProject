const  express = require('express');
const fileUpload = require('express-fileupload');
const  cors = require('cors');
require('dotenv').config();
const nodemailer = require("nodemailer");
const servicesDB =require('./data/services.json');

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

const messageToEmail = (elements, file) => {

  const{type, name, email, telephone, message} = elements

  const emailPattern = {
    from: process.env.EMAIL, // sender address/ company name
    to: "testastestauskas@yandex.com", // list of receivers
    subject: `Message from: ${email}, Subject: ${type}`, // Subject line
    html: `<b>name: ${name}</b><br/><b> Phone: ${telephone}</b><br/><b> E-mail: ${email}</b><br/><p>${message}<p/>`, // html body
    replyTo: email // reply to option
  }

  if(file){
    emailPattern.attachments = [{fileName: file.name, path: `${__dirname}/uploads/${file.name}`}]
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
  console.log("req.body: ", req.body)
  console.log("req.files: ", req.files)
  let file 

  if(req.files){
    file = req.files.file
    file.mv(`${__dirname}/uploads/${file.name}`)
  }

  const message = messageToEmail(req.body, file)
  const toClient = messageToClient(req.body)

  await transporter.sendMail(message,(err)=>{
    if(err){
      res.json({Error:err})      // kazka sugalvoti su siuo erroru, kad nesiustu useriui
    }else{
      res.json(`Thank you ${req.body.name}, your message was succesfuly sent!`)
    }
  });

});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
});



