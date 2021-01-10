import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik';
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

      const onSubmit = (values) => {
        console.log("onsubmit: ",values)
      }


        return ( 
            <div className="columns" style={{"width": "80%"}}>
                <div className="column px-6">
                    <a style={{"color":"silver"}}  href="mailto:info@mastis.co.uk"><strong>Email: info@mastis.co.uk</strong></a>
                </div>
                <div className="column px-6">
                    <a style={{"color":"silver"}} href="tel:+447450225137"><strong>Telephone: +447450 225 137</strong></a>
                </div>
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
                            placeholder="Message"
                            required
                        />
                    </div>
                    <div class="field is-grouped is-grouped-centered">
                        <button class="button is-primary" type='submit' style={{"width": "100%"}}>Send!</button>
                    </div>
                </form>
                <h2>formikas</h2>
                <Formik 
                    initialValues={{
                        type:"",

                        name:"",
                        email:"",
                        telephone:"",
                        address:"",
                        UTRnumber:"",
                        dateOfBirth:"",
                        NINnumber: "",
                        message:"",
                        upload:"",
                        
                        companyName:"",
                        companyNumber: "",
                        email2:"",
                        telephone2:"",
                        VATregistrationNumber:"",
                        utrnr2:"",
                        message2:"",
                        upload2:"",

                        preferedCompanyName: "",
                        alternativeName: "",
                        companyType:"",
                        natureOfbusiness:"",
                        email3:"",
                        telephone3:"",
                        companyAdress:"",
                        postcode:"",
                        numberOfShares:"",
                        valueOFShares:"",
                        numberOFshareholders:"",
                        shareholderPosition: "dropdown",
                        numberofSharesHolding:"",
                        nameOfShareholder:"",
                        surnameOfShareholder:"",
                        dateOfBirthOfShareholder:"",
                        nationalInsuranceOfShareholder:"",
                        utrNumberOFShareholder:"",
                        nationalityOfShareholder:"",
                        emailOfShareholder:"",
                        phonenumberOfShareholder:"",
                        adressOfShareholder:"",
                        postcodeOFShareholderr:"",
                        hometownOfShareholder:"",
                        mothersMaidenNameOfshareholder:"",
                        fathersNameOFShareholder:"",
                        uploadIDFOTO: "",
                        checkbox:"confimation that details are correct",

                        nameOtherQueries:"",
                        emailOtherqueries:"",
                        telephoneOTherqueries:"",
                        messageOtherQueries:"",
                        uploadOtherqueries:""


                }}
                onSubmit={onSubmit}
                validate={values => {
                    // cia eis validationas
                }}
                >
                {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors})=>{ 
                    return (
                        <Form>
                            <div>
                                <Field as="select" name="type">
                                    <option defaultChecked disabled value="null">Select an entry type</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                </Field>
                            </div>

                            <Field key="name" placeholder="Name" name="name"/>
                            <Field key="email" placeholder="E-mail" name="email"/>
                            <button type="button" onClick={()=>{console.log(values)}}>check values</button>
                            <button type="submit">submit</button>
                        </Form>
                    )
                }
            }        
                </Formik>         
            </div>
          ) 
}

export default Contact