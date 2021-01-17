import React, {useState} from 'react'
import { Formik, Field, Form, FieldArray } from 'formik';
import {TextField, TextArea, FileUpload, SelectField, NumberField} from './FormField'




const NewCompanyEstablish = (props) => {
    const [page, setPage] = useState(0)
    const [shares, setShares] = useState(0)

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

    const validateCompanyType = (value) =>{
        let errorMessage;
        if(!value){
            errorMessage = "Please select type of the company"
        }
        return errorMessage
    }

    const validateSharesPerShareholder = () => {
        let errorMessage;
    }
    
    const typeOfCompanyOptions = [
        { value: null, label: "Type of the company"},
        { value: "LTD" , label: "LTD" },
        { value: "LIMITED" , label: "LIMITED" }
    ]

    const positionOfShareholderOptions = [
        { value: null, label: "Position of shareholder"},
        { value: "Director" , label: "Director" },
        { value: "Secretary " , label: "Secretary "},
        { value: "Only shareholder" , label: "Only shareholder" }
    ]

    const createShareholders = (values) => {
        if(values.numberOfShareHolders > 3 || values.numberOfShareHolders < 1){
            validateNumberOfShareHolders(values.numberOfShareHolders)
        }
        values.shareHolders.splice(0, values.shareHolders.length)
        for(let i=1;i<=values.numberOfShareHolders;i++){
            values.shareHolders.push({shareholder:i,position:"",numberOfShares:"",name:"",surname:"",dateOfBirth:"",NINnumber:"",UTRnumber:"",nationality:"",email:"",phonenumber:"",address:"",postcode:"",homeTown:"",mothersMaidenName:"",fathersName:"",})
        }
        setPage(page+1)
        setShares(values.numberOfShares)
    }

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
                                    shareHolders:[],
                                    test: page

                                }}
                    onSubmit={props.handleSubmit}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                        { page === 0  ? [<div className="field">
                                                <Field placeholder="Preferred company name" name="preferredCompanyName" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="Alternative company name" name="alternativeCompanyName" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <span>Type of the company: </span>
                                                <SelectField label="Entry type" name="typeOfCompany" options={typeOfCompanyOptions} validate={validateCompanyType}/>
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
                                                <button disabled={values.numberOfShareHolders > 3 || values.numberOfShareHolders < 1 }  type="button" onClick={()=>{createShareholders(values)}}>Next</button>
                                            
                                            </div>
                                            ] 
                                        : null }
                                        {page > 0 ? 
                                        <div>
                                            {values.shareHolders.map((shareholder, index)=>{return(
                                             <div>
                                                 { page === shareholder.shareholder ? 
                                                 [<p>index : {index} Shareholder {shareholder.shareholder}</p>,
                                                 <div className="field"> 
                                                    <SelectField label="Position" name={`shareHolders[${index}].position`} options={positionOfShareholderOptions} />
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Number of shares holding e.g. 100" name={`shareHolders[${index}].numberOfShares`} validate={validateNumberField} component={TextField}/>
                                                 </div>,
                                                 <button type="button" onClick={()=>{setPage(page+1)}}>Next</button>,
                                                 <button type="button" onClick={()=>{setPage(page-1)}}>Back</button>]
                                                  : null }
                                             </div>
                                            )})}
                                        </div>  : null}
                                        
                                            <div className="field">
                                                <FileUpload  setUploadedFile={props.setUploadedFile}/>
                                            </div>
                                            <div >
                                                <Field  placeholder="Message" name="message" validate={validateField} component={TextArea}/>
                                            </div>

                                            <div style={{"paddingTop":"10px" , "width":"260px"}}>
                                                <button type="button" onClick={()=>{console.log(values)}}>values</button>
                                                <button type="button" onClick={()=>{console.log(page)}}>state/page</button>
                                                <button type="button" onClick={()=>{console.log(shares)}}>state/shares</button>
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


//padaryti kad kiekvienam shareholderiui padarytu fieldus atitinkamai i initial values! galbut net tas field array nera reikalingas siou atveju
// tada padaryti kad kiekviena karta pakeitus number of shareholders tik tiek ju array ir butu nei daugiau nei maziau
// padaryti error kad rodytu pries type of company
// padaryti po submit kad ismestu nauje modal su res.json