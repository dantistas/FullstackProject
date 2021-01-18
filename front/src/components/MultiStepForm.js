import React, { useState } from 'react'
import axios from 'axios'
import Contact from './Contact'
import OtherQueries from './Forms/OtherQueries'
import SelfEmployed from './Forms/SelfEmployed'
import CompanyMAtters from './Forms/CompanyMatters'
import NewCompanyEstablish from './Forms/NewCompanyEstablish'



const MultiStepForm = (props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [error, setError] = useState("")
    const [type, setType] = useState(null)



    const submit = async () => {
        const object = { 
            subject: props.subject,
            name: name,
            email: email,
            phonenumber: phonenumber,
        }
        if(isNaN(phonenumber) || !email.includes('@') ){
            console.log("numeris arba emailas sudinas") 
        }else{
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
            // window.alert("Aciu uz demesi")
            // props.setPage("home")    //<<<--- cia perdarysi i nauje componenta notifikeiseno
        }   
      }
      
    const annouceError = (error) => {
            setError(error)
        setTimeout(() => {
            setError("")
        }, 3000);
    }

    const handleSelectFieldChange = (event) => {
        setType(event.target.value)
        console.log(event.target.value)

    }
        return (
            <div className="container px-6">  
                <p className="subtile">Step {props.formPage} out of 3</p>
                {error ? <p style={{"color": "red"}}>{error}</p> : null }
                 <div className="field has-addons">
                    {props.formPage === 1 ? [<input required className="input" type="text" placeholder="Full name" value={name} onChange={({ target }) => setName(target.value)}></input>, <button className="button is-success" onClick={ ()=>{ name ? props.setFormPage(props.formPage+1) : annouceError("Field is either missing")} }>Next</button> ]: null}
                    {props.formPage === 2 ? [<input className="input" placeholder="E-mail" value={email} onChange={({ target }) => setEmail(target.value)}></input>, <button className="button is-success" onClick={()=>{ email && email.match(/\S+@\S+\.\S+/) ? props.setFormPage(props.formPage+1): annouceError("Field is either missing or E-mail format is not valid")}}>Next</button> ]: null }
                    {props.formPage === 3 ? [<input className="input" placeholder="Phone number" type='number' value={phonenumber} onChange={({ target }) => setPhonenumber(target.value)}></input>, <button className="button is-success" onClick={ ()=>{name && email && phonenumber ?  submit()  : annouceError("Field is either missing or Phone-number format is not valid")}}>Send</button> ]: null}
                    {props.formPage > 1 ? <button className="button is-danger" onClick={()=>{props.setFormPage(props.formPage-1)}}>Back</button> : null}
                </div>
                <OtherQueries></OtherQueries>
                <div className="select">
                    <select onChange={handleSelectFieldChange}>
                        <option disabled selected>Select a reason you are contacting</option>
                        <option value="General queries">Other queries</option>
                        <option value="New company establish">New company establish</option>
                        <option value="Company matters">Company matters</option>
                        <option value="Self employed">Self employed</option>
                    </select>
                    {type ? <Contact type={type}/> : null}
                </div>
                <button onClick={()=>{console.log(type)}}>press me </button>
            </div>

          ) 
}

export default MultiStepForm