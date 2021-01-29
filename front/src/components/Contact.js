import React, { useState } from 'react'
import axios from 'axios'
import OtherQueries from './Forms/OtherQueries'
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import ChatIcon from '@material-ui/icons/Chat';
import { Fab } from '@material-ui/core';

const Contact = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [body, setBody] = useState('')
    



    const submit = async (event) => {
        const object = { 
            subject: props.subject,
            name: name,
            email: email,
            phonenumber: phonenumber,
            body: body,
        }
        if(isNaN(phonenumber) || !email.includes('@') ){
            event.preventDefault()
            props.inform("Incorrect number or email address!")  
        }else{
            event.preventDefault()
            props.inform("Aciu uz demesy XD !!!!")                 //<<<------ beleka xDDDD
            axios.post('http://localhost:3001/swx', object)   // <<<------ dev mode http://localhost:3001/swx
            .then(function (response) {
                console.log(response.data);
                window.alert(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
            setName('')
            setEmail('')
            setPhonenumber('')
            setBody('')
            // window.alert("Aciu uz demesi")
            // props.setPage("home")    //<<<--- cia perdarysi i nauje componenta notifikeiseno
        }   
      }

      const onSubmit = (values) => {
        axios.post('http://localhost:3001/swx', values)
        .then(function(res) {
            window.alert(res.data)
        })
      }


        return (
            <div className="block">
                <div className="columns " style={{"width": "100%"}}>
                    <div className="column px-6">
                        <a href="mailto:info@mastis.co.uk">
                            <div style={{"opacity":"0.9","text-align":"center","backgroundColor":"silver","borderRadius":"10px","padding":"10px"}}>
                                <Fab>
                                    <EmailIcon color="primary" fontSize="large"/>
                                </Fab>
                                <p><strong style={{"color":"black"}}>info@mastis.co.uk</strong></p>
                            </div>
                        </a>
                    </div>
                    <div className="column px-6">
                        <a href="tel:+447450225137">
                            <div style={{"opacity":"0.9","text-align":"center","backgroundColor":"silver","borderRadius":"10px","padding":"10px"}}>
                                    <Fab>
                                        <CallIcon color="primary" fontSize="large"/>
                                    </Fab>
                                    <p><strong style={{"color":"black"}}>+447450225137</strong></p>
                            </div>
                        </a>
                    </div>
                    <div className="column px-6">
                        <a type="button" onClick={()=>{props.toggleVisibility()}}>
                            <div  style={{"opacity":"0.9","text-align":"center","backgroundColor":"silver","borderRadius":"10px","padding":"10px"}}>
                                <Fab>
                                    <ChatIcon color="primary" fontSize="large" onClick={()=>{props.toggleVisibility()}}/>
                                </Fab>
                                <p><strong style={{"color":"black"}}>Contact us form</strong></p>               
                            </div>
                        </a>  
                    </div>
                </div>
            </div> 
          ) 
}

export default Contact