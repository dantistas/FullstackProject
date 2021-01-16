import React, {useState} from 'react'
import { Formik, Field, Form, FieldArray } from 'formik';
import {TextField, TextArea, FileUpload, SelectField, NumberField} from './FormField'




const NewCompanyEstablish = (props) => {
    const [page, setPage] = useState(0)

    const validateEmail = (value) => {
        let errorMessage;
        if(!value){
            errorMessage="Field is required"
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          errorMessage = 'Invalid email address';
        }
        return errorMessage;
      };

    const validateField = (value) => {
        let errorMessage;
        if(!value){
            errorMessage = "Field is required"
        }
        return errorMessage
    }
    
    const validateNumberField = (value) => {
        let errorMessage
        if(!value){
            errorMessage = "Field is required"
        }else if (isNaN(value)){
            errorMessage = "Invalid value"
        }
        return errorMessage
    }

    const validatePhoneNumber = (value) => {
        let errorMessage;
        if(!value){
            errorMessage = "Field is required"
        }else if (isNaN(value)){
            errorMessage = "Invalid phone number"
        }
        return errorMessage
    }

    const validateNumberOfShareHolders = (value) => {
        let errorMessage;
        if(value < 1 || value === 0 || !value){
            errorMessage = "Field is required or value is invalid"
        }else if (isNaN(value)){
            errorMessage = "Must be a number"
        }else if(value > 3){
            errorMessage = "If more than 3 contacts us directly"
        }
        return errorMessage

    }
    
    const typeOfCompanyOptions = [
        { value: "LTD" , label: "LTD" },
        { value: "LIMITED" , label: "LIMITED" }
    ]

return(
        <div>
            <Formik 
                    initialValues={{
                                    type: props.type,
                                    preferredCompanyName:"",
                                    alternativeCompanyName:"",
                                    typeOfCompany:"",
                                    natureOfBusiness:"",
                                    email:"",
                                    telephone:"",
                                    companyAdress:"",
                                    companyPostcode:"",
                                    numberOfShares:"",
                                    valueOfAllShares:"",
                                    numberOfShareHolders:"",
                                    shareHolders:[]

                                }}
                    onSubmit={props.handleSubmit}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                        { page  ? [<div className="field">
                                                <Field placeholder="Preferred company name" name="preferredCompanyName" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="Alternative company name" name="alternativeCompanyName" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <span>Type of the company: </span>
                                                <SelectField label="Entry type" name="typeOfCompany" options={typeOfCompanyOptions}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="Nature of business" name="natureOfBusiness" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="E-mail" name="email" validate={validateEmail} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="Telephone" name="telephone" validate={validatePhoneNumber} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="Company address" name="companyAdress" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="Company postcode" name="companyPostcode" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="Number of shares e.g. 100" name="numberOfShares" validate={validateNumberField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="Value of shares" name="valueOfAllShares" validate={validateNumberField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="Number of Share Holders" name="numberOfShareHolders" component={NumberField} min={1} max={3} validate={validateNumberOfShareHolders}/>
                                            </div>,
                                            <div>
                                                <FieldArray name="shareHolders">{({push}) => (
                                                    [<button type="button" onClick={()=>{setPage(values.numberOfShareHolders)}}>setpage</button>,
                                                    <button type="button" onClick={()=>{for(let i=0;i<page;i++){push({id:i,name:i})}}}>Next</button>]
                                                )}
                                                </FieldArray>
                                            </div>
                                            ] 
                                        : null }
                                        {page > 0 ? <p>swx</p> : null}
                                            
                                            <div className="field">
                                                <FileUpload  setUploadedFile={props.setUploadedFile}/>
                                            </div>
                                            <div >
                                                <Field  placeholder="Message" name="message" validate={validateField} component={TextArea}/>
                                            </div>

                                            <div style={{"paddingTop":"10px" , "width":"260px"}}>
                                                <button type="button" onClick={()=>{console.log(values)}}>values</button>
                                                <button type="button" onClick={()=>{console.log(page)}}>state</button>
                                                <button className="button is-success" type="submit" disabled={!dirty || !isValid}>submit</button>
                                            </div>
                                    </Form>
                                    )
                                }
                            }  
            </Formik>
        </div>
    )
}

export default NewCompanyEstablish