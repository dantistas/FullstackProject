import React from 'react'
import { Formik, Field, Form } from 'formik';
import {TextField, TextArea} from './FormField'




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
                                                <Field placeholder="Name" name="name" validate={validateField} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="Surname" name="surname" validate={validateField} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="Date of Birth DD/MM/YYYY" name="dateOfBirth" validate={validateField} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="E-mail" name="email" validate={validateEmail} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="Telephone" name="telephone" validate={validatePhoneNumber} component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="Address" name="address" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="Postcode" name="postcode" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="UTR number" name="UTRnumber" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <Field placeholder="National insurance number" name="NINnumber" component={TextField}/>
                                            </div>
                                            <div className="field">
                                                <span>Picture of ID :</span>
                                                <Field className="input" id="file" name="file" type="file"/>
                                            </div>
                                            <div >
                                                <Field placeholder="Message" name="message" validate={validateField} component={TextArea}/>
                                            </div>
                                            <div style={{"paddingTop":"10px" , "width":"260px"}}>
                                                <button className="button is-success" type="submit" disabled={!dirty ||!isValid}>submit</button>
                                                <button type="button" onClick={()=>{console.log(values)}}>values</button>
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