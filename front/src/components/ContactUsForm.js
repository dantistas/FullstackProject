import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Field, Form } from 'formik';
import OtherQueries from './Forms/OtherQueries'




const ContactUsForm = (props) => {
    const [type, setType] = useState(null)
    const [formPage, setFormPage] = useState(1)

    const handleSelectFieldChange = (event) => {
        setType(event.target.value)
        console.log(event.target.value)
    }

    const handleSubmit = (values) => {
        console.log("submit: ",values)
      }


    return (
        <div>
            <div className="modal py-6" style={props.showWhenVisible}>
              <div className="modal-background"></div>
                <div className="container px-5">
                  <p className="title">Contact us</p>
                </div>
                <div className="container py-2 px-6">
                  <div className="modal-content" style={{"overflow":"hidden"}}>
                    <div className="columns is-vcentered is-centered">
                      <div className="column is-centered py-6">
                        <div className="select" style={{"paddingBottom": "5px"}}>
                            <select style={{"width":"260px"}} onChange={handleSelectFieldChange}>
                                <option disabled selected>Reason for contacting us</option>
                                <option value="Other queries">Other queries</option>
                                <option value="New company establish">New company establish</option>
                                <option value="Company matters">Company matters</option>
                                <option value="Self employed">Self employed</option>
                            </select>
                        </div>
                        {type === "Other queries" ? <OtherQueries handleSubmit={handleSubmit}/> : null}
                        {/* {type   ?   
                                    <Formik 
                                        initialValues={{
                                                        type:type,
                                
                                                        name:"",
                                                        surname:"",
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
                                                        file:""
                                        }}
                                        onSubmit={handleSubmit}
                                        validate={values => {
                                            // cia eis validationas
                                        }}
                                        >
                                        {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors})=>{
                                            return(
                                                <Form style={{"paddingTop":"10px" , "width":"260px"}}> 
                                                    <div className="field">
                                                        <Field className="input" key="name" placeholder="Name" name="name"/>
                                                    </div>
                                                    <div className="field">
                                                        <Field className="input" key="surname" placeholder="Surname" name="surname"/>
                                                    </div>
                                                    <div className="field">
                                                        <Field className="input" key="email" placeholder="E-mail" name="email"/>
                                                    </div>
                                                    <div className="field">
                                                        <Field className="input" key="telephone" placeholder="telephone" name="telephone"/>
                                                    </div>
                                                    <div className="field">
                                                        <Field className="input" id="file" name="file" type="file"/>
                                                    </div>
                                                    <div >
                                                        <Field  className="textarea" placeholder="Message" key="message" name="message"/>
                                                    </div>
                                                    <button type="button" onClick={()=>{console.log(values)}}>values.type</button>
                                                    <button type="submit">submit</button>
                                                </Form>
                                                )
                                            }
                                        }  
                                    </Formik> 
                                : null} */}
                      </div>
                    </div>
                    <button onClick={()=>{props.toggleVisibility()}} className="modal-close is-large" aria-label="close"></button>
                  </div>
                </div>
            </div>
      </div>
    )

}


export default ContactUsForm