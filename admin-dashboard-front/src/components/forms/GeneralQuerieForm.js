import React from 'react'
import { Formik, Field, Form } from 'formik';
import {TextField, TextArea, FileUpload} from './FormField'




const GeneralQuerieForm = ({querie}) => {

    // const validateEmail = (value) => {
    //     let errorMessage;
    //     if(!value){
    //         errorMessage= props.changeTitleLanguage("Field is required", "Privalomas laukelis")
    //     }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    //       errorMessage = props.changeTitleLanguage("Invalid email address", "Neteisingas elektroninio pašto adresas")
    //     }
    //     return errorMessage;
    //   };

    // const validateField = (value) => {
    //     let errorMessage;
    //     if(!value){
    //         errorMessage = props.changeTitleLanguage("Field is required", "Privalomas laukelis")
    //     }
    //     return errorMessage
    // } 

    // const validatePhoneNumber = (value) => {
    //     let errorMessage;
    //     if(!value){
    //         errorMessage = props.changeTitleLanguage("Field is required", "Privalomas laukelis")
    //     }else if (isNaN(value)){
    //         errorMessage = props.changeTitleLanguage("Invalid phone number", "Neteisingas telefono numeris")
    //     }
    //     return errorMessage
    // } 

return(
        <div>
            <Formik 
                    initialValues={{
                                    type: querie.type,
                                    name: querie.name,
                                    email: querie.email,
                                    telephone: querie.telephone,
                                    file: querie.file,
                                    message: querie.message,
                                    date: querie.date
                                }}
                    onSubmit={()=>{console.log("zjbs")}}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                            <div className="field">
                                                <Field label="Name:" placeholder="John" name="name" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label="Email:" placeholder="example@domain.com" name="email" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label="Telephone:" placeholder="+44..." name="telephone" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <FileUpload label="File:"/>
                                            </div>
                                            <div >
                                                <Field label="Message:" placeholder="Your message...:" name="message" component={TextArea}/>
                                            </div>
                                            <div style={{"paddingTop":"10px" , "width":"260px"}}>
                                                <button onClick={()=>{console.log(values)}}>values</button>
                                                <button className="button is-success" type="submit" onClick={()=>{values.date = new Date().toString()}}>Submit</button>
                                            </div>
                                    </Form>
                                    )
                                }
                            }  
            </Formik>
        </div>
    )
}

export default GeneralQuerieForm