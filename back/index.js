const  express = require('express');
const  cors = require('cors');
require('dotenv').config();
const nodemailer = require("nodemailer");
const servicesDB =require('./data/services.json');

const app = express();

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

const messageToEmail = (elements) => {
  const{subject, name, email,phonenumber, body} = elements 
  return {
    from: process.env.EMAIL, // sender address/ company name
    to: "testastestauskas@yandex.com", // list of receivers
    subject: `Message from: ${email}, Subject: ${subject}`, // Subject line
    html: `<b>name: ${name}</b><br/><b> Phone: ${phonenumber}</b><br/><b> E-mail: ${email}</b><br/><p>${body}<p/>`, // html body
    replyTo: email // reply to option
  }
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
  const message = messageToEmail(req.body)
  const toClient = messageToClient(req.body)

  await transporter.sendMail(message,(err)=>{
    if(err){
      res.json({Error:err})
    }else{
      res.json(`Thank you ${req.body.name}, your message was succesfuly sent!`)
    }
  });

});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
});



// 1) forma vardas surname -> email -> phonenumber -> authentification// save info i database -> atsiusti klientuj instrukcijas priklausomai nuo subject// vsio baigtas kriukis sito sudo
// 2) padaryti contact form componenta
//3) perdeti services i db , vienas komponentas bus servisu is api duos butent toki kokio reike apollo graphql
