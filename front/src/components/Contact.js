import React, { useState } from 'react'
import axios from 'axios'



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



        return (
            <div class="container" style={{"width": "80%"}}>
                <form onSubmit={submit} >
                    <div class="field">
                        <input
                            class="input"
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div class="field">
                        <input
                            class="input"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            placeholder="E-mail"
                            required
                        />
                    </div>
                    <div class="field">
                        <input
                            class="input"
                            value={phonenumber}
                            onChange={({ target }) => setPhonenumber(target.value)}
                            placeholder="Phonenumber"
                            required
                        />
                    </div>
                    <div class="field">
                        <input
                            class="textarea"
                            value={body}
                            onChange={({ target }) => setBody(target.value)}
                            placeholder="Body"
                            required
                        />
                    </div>
                    <div class="field is-grouped is-grouped-centered">
                        <button class="button is-primary" type='submit' style={{"width": "100%"}}>Send!</button>
                    </div>
                </form>
         
            </div>
          ) 
}

export default Contact