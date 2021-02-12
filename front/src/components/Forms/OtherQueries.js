import React from 'react'
import { Formik, Field, Form } from 'formik';
import {TextField, TextArea, FileUpload} from './FormField'




const OtherQueries = (props) => {

    const validateEmail = (value) => {
        let errorMessage;
        if(!value){
            errorMessage= props.changeTitleLanguage("Field is required", "Privalomas laukelis")
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          errorMessage = props.changeTitleLanguage("Invalid email address", "Neteisingas elektroninio pašto adresas")
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
                                    email:"",
                                    telephone:"",
                                    file:"",
                                    message:"",
                                    date: ""
                                }}
                    onSubmit={props.handleSubmit}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Name:","Vardas:")} placeholder={props.changeTitleLanguage("John","Jonas")} name="name" validate={validateField} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Email:","Elektroninio pašto adresas:")} placeholder={props.changeTitleLanguage("example@domain.com","pavyzdys@domenas.com")} name="email" validate={validateEmail} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Telephone:","Telefono numeris:")} placeholder="+44..." name="telephone" validate={validatePhoneNumber} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <FileUpload label={props.changeTitleLanguage("File:","Failas:")} values={values} uploadedFile={props.uploadedFile} setUploadedFile={props.setUploadedFile}/>
                                            </div>
                                            <div >
                                                <Field label={props.changeTitleLanguage("Message:","Pranešimas:")} placeholder={props.changeTitleLanguage("Your message...:","Jūsų žinutė...")} name="message" validate={validateField} component={TextArea}/>
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

export default OtherQueries