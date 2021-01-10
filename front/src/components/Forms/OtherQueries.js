import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Field, Form } from 'formik';




const OtherQueries = (props) => {

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
            errorMessage = "Must be a number"
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
                                    message:""
                                }}
                    onSubmit={props.handleSubmit}
                    // validate={values => {
                    //             const requiredError = "Field is required";
                    //             let errors = {
                    //                 name:"",
                    //             }
                    //             if(!values.name){
                    //                 errors.name = requiredError
                    //             }
                    //         }}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                        <button type="button" onClick={()=>{console.log(touched)}}>tocuhed ???</button>
                                        <button type="button" onClick={()=>{console.log(errors)}}>errors ???</button>  
                                            <div className="field">
                                                <Field className="input" placeholder="Name" name="name" validate={validateField}/>
                                                {errors.name && touched.name ? <div style={{"color":"red"}}><p>{errors.name}</p></div> : null}
                                            </div>
                                            <div className="field">
                                                <Field className="input" placeholder="E-mail" name="email" validate={validateEmail}/>
                                                {errors.email && touched.email ? <div style={{"color":"red"}}><p>{errors.email}</p></div> : null}
                                            </div>
                                            <div className="field">
                                                <Field className="input" placeholder="Telephone" name="telephone" validate={validatePhoneNumber}/>
                                                {errors.telephone && touched.telephone ? <div style={{"color":"red"}}><p>{errors.telephone}</p></div> : null}
                                            </div>
                                            <div className="field">
                                                <Field className="input" id="file" name="file" type="file"/>
                                            </div>
                                            <div >
                                                <Field  className="textarea" placeholder="Message" name="message" validate={validateField}/>
                                                {errors.message && touched.message ? <div style={{"color":"red"}}><p>{errors.message}</p></div> : null}
                                            </div>
                                            <button type="button" onClick={()=>{console.log(values)}}>values.type</button>
                                            <button type="submit" disabled={!isValid}>submit</button>
                                    </Form>
                                    )
                                }
                            }  
            </Formik>
        </div>
    )
}

export default OtherQueries