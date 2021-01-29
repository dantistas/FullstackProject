import React from 'react'
import { Formik, Field, Form } from 'formik';
import {TextField, TextArea, FileUpload} from './FormField'




const SelfEmployed = (props) => {

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
                                    name:"",
                                    surname:"",
                                    email:"",
                                    telephone:"",
                                    address:"",
                                    postcode:"",
                                    dateOfBirth:"",
                                    UTRnumber:"",
                                    NINnumber: "",
                                    file:"",
                                    message:""
                                }}
                    onSubmit={props.handleSubmit}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                            <div className="field">
                                                <Field label="Name:" placeholder="John" name="name" validate={validateField} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label="Surname:" placeholder="Smith" name="surname" validate={validateField} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label="Date of Birth:" placeholder="DD/MM/YYYY" name="dateOfBirth" validate={validateField} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label="Email:" placeholder="example@domain.com" name="email" validate={validateEmail} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label="Telephone:" placeholder="+44..." name="telephone" validate={validatePhoneNumber} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label="Address:" placeholder="Street name and house number" name="address" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label="Postcode:" placeholder="Postcode" name="postcode" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label="UTR number:" placeholder="Your UTR number" name="UTRnumber" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field label="National insurance number:" placeholder="your national insurance number" name="NINnumber" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <label>Picture of ID :</label>
                                                <FileUpload values={values} uploadedFile={props.uploadedFile} setUploadedFile={props.setUploadedFile} />
                                            </div>
                                            <div >
                                                <Field label="Message:" placeholder="Your message..." name="message" validate={validateField} component={TextArea}/>
                                            </div>
                                            <div style={{"paddingTop":"10px" , "width":"260px"}}>
                                                <button className="button is-success" type="submit" disabled={!dirty ||!isValid}>submit</button>
                                            </div>
        
                                    </Form>
                                    )
                                }
                            }  
            </Formik>
        </div>
    )
}

export default SelfEmployed