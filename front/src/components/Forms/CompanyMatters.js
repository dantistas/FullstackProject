import React from 'react'
import { Formik, Field, Form } from 'formik';
import {TextField, TextArea, FileUpload} from './FormField'




const CompanyMAtters = (props) => {

    const validateEmail = (value) => {
        let errorMessage;
        if(!value){
            errorMessage= props.changeTitleLanguage("Field is required", "Privalomas laukelis")
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          errorMessage = props.changeTitleLanguage("'Invalid email address'", "Neteisingas elektroninio pašto adresas");
        }
        return errorMessage;
      };

    const validateField = (value) => {
        let errorMessage;
        if(!value){
            errorMessage = props.changeTitleLanguage("Field is required", "Privalomas laukelis")
        }
        return errorMessage
    } 

    const validatePhoneNumber = (value) => {
        let errorMessage;
        if(!value){
            errorMessage = props.changeTitleLanguage("Field is required", "Privalomas laukelis")
        }else if (isNaN(value)){
            errorMessage = props.changeTitleLanguage("Invalid phone number", "Neteisingas telefono numeris")
        }
        return errorMessage
    } 

return(
        <div>
            <Formik 
                    initialValues={{
                                    type: props.type,
                                    name:"",
                                    companyName:"",
                                    companyNumber:"",
                                    email:"",
                                    telephone:"",
                                    VATNumber:"",
                                    UTRNumber:"",
                                    message:"",
                                    file:"",
                                    date:""
                                }}
                    onSubmit={props.handleSubmit}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Full Name:", "Vardas ir pavardė")} placeholder={props.changeTitleLanguage("John Smith", "Jonas Petrauskas")} name="name" validate={validateField} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Company name:", "Įmonės pavadinimas:")} placeholder={props.changeTitleLanguage("Name of the company", "Jūsų įmonės pavadinimas")} name="companyName" validate={validateField} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Company number:", "Įmonės numeris:")} placeholder={props.changeTitleLanguage("Number of the company", "Jūsų įmonės numeris")} name="companyNumber" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("E-mail:", "Elektroninio pašto adresas:")} placeholder={props.changeTitleLanguage("example@domain.com", "pavyzdys@domenas.com")} name="email" validate={validateEmail} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Telephone:", "Telefono numeris:")} placeholder="+44..." name="telephone" validate={validatePhoneNumber} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("VAT registration number:", "PVM registracijos numeris:")} placeholder={props.changeTitleLanguage("VAT registration number", "PVM registracijos numeris")} name="VATNumber" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("UTR number:", "UTR numeris:")} placeholder={props.changeTitleLanguage("UTR number", "UTR numeris")} name="UTRNumber" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <label>{props.changeTitleLanguage("File:", "Failas:")}</label>
                                                <FileUpload values={values} uploadedFile={props.uploadedFile} setUploadedFile={props.setUploadedFile}/>
                                            </div>
                                            <div >
                                                <Field label={props.changeTitleLanguage("Message:", "Pranešimas:")}  placeholder={props.changeTitleLanguage("Your message...", "Jūsų žinutė..,")} name="message" validate={validateField} component={TextArea}/>
                                            </div>
                                            <div style={{"paddingTop":"10px" , "width":"260px"}}>
                                                <button className="button is-success" type="submit" disabled={!dirty || !isValid} onClick={()=>{values.date = new Date().toString()}}>{props.changeTitleLanguage("Submit", "Siūsti")}</button>
                                            </div>
                                    </Form>
                                    )
                                }
                            }  
            </Formik>
        </div>
    )
}

export default CompanyMAtters