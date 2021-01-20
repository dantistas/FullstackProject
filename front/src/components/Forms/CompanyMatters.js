import React from 'react'
import { Formik, Field, Form } from 'formik';
import {TextField, TextArea, FileUpload} from './FormField'




const CompanyMAtters = (props) => {

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

    const validatePhoneNumber = (value) => {
        let errorMessage;
        if(!value){
            errorMessage = "Field is required"
        }else if (isNaN(value)){
            errorMessage = "Invalid phone number"
        }
        return errorMessage
    } 

return(
        <div>
            <Formik 
                    initialValues={{
                                    type: props.type,
                                    companyName:"",
                                    companyNumber:"",
                                    email:"",
                                    telephone:"",
                                    VATNumber:"",
                                    UTRNumber:"",
                                    message:"",
                                    file:""
                                }}
                    onSubmit={props.handleSubmit}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                            <div className="field">
                                                <Field placeholder="Company Name" name="companyName" validate={validateField} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="Company Number" name="companyNumber" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="E-mail" name="email" validate={validateEmail} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="Telephone" name="telephone" validate={validatePhoneNumber} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="VAT registration number" name="VATNumber" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="UTR number" name="UTRNumber" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <FileUpload values={values} uploadedFile={props.uploadedFile} setUploadedFile={props.setUploadedFile}/>
                                            </div>
                                            <div >
                                                <Field  placeholder="Message" name="message" validate={validateField} component={TextArea}/>
                                            </div>
                                            <div style={{"paddingTop":"10px" , "width":"260px"}}>
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

export default CompanyMAtters