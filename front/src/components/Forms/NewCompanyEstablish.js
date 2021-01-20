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

    const validateSelectField = (value) =>{
        let errorMessage;
        if(!value){
            errorMessage = "Field is required"
        }
        if(value === "Type of the company"){
            errorMessage = "Please select type of the company"
        }
        if(value === "Position of shareholder"){
            errorMessage = "Please select position of the shareholder"
        }
        return errorMessage
    }

    const validateSharesPerShareholder = (value) => {
        let errorMessage;
        if(!value){
            errorMessage= "Field is required"
        }
        if(isNaN(value)){
            errorMessage = "value must be a number"
        }
        setShares(shares - value)
        return errorMessage
    }

    const validateDOB = (value) => {
        let errorMessage;
        const datePatern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
        if(!value){
            errorMessage = "Field is required"
        }
        if(!datePatern.test(value)){
            errorMessage = "Invalid value of date of birth"
        }
        return errorMessage
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
            values.shareHolders.push({shareholder:i,position:"",numberOfShares:"",name:"",surname:"",dateOfBirth:"",NINnumber:"",UTRnumber:"",nationality:"",email:"",phonenumber:"",address:"",postcode:"",homeTown:"",mothersMaidenName:"",fathersName:"", file:"" })
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
                                    confirmed: false,
                                    message:""

                                }}
                    onSubmit={props.handleSubmit}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                const firstPartValidation = values.numberOfShareHolders > 3 || values.numberOfShareHolders < 1 || !values.preferredCompanyName || !values.alternativeCompanyName || !values.typeOfCompany || !values.natureOfBusiness || !values.email || !values.telephone || !values.companyAdress || !values.companyPostcode || !values.numberOfShares || !values.valueOfAllShares || !values.numberOfShareHolders
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                        { page === 0  ? [<div className="field">
                                                <Field placeholder="Preferred company name" name="preferredCompanyName" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field placeholder="Alternative company name" name="alternativeCompanyName" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <SelectField label="Entry type" name="typeOfCompany" options={typeOfCompanyOptions} validate={validateSelectField}/>
                                                <div style={{color:'red'}}>
                                                    {errors.typeOfCompany ? <p>Please select a type of a company</p> : null}
                                                </div>
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
                                            <div className="buttons">
                                                <button className="button is-success" disabled={values.numberOfShareHolders > 3 || values.numberOfShareHolders < 1 || firstPartValidation}  type="button" onClick={()=>{createShareholders(values)}}>Next</button>
                                                <div>
                                                   {firstPartValidation ? <p style={{"color": "red"}}>All fields are required!</p> : null} 
                                                </div>
                                            </div>
                                            ] 
                                        : null }
                                        {page > 0 ? 
                                        <div>
                                            {values.shareHolders.map((shareholder, index)=>{
                                            const shareholderInfoValidation = !shareholder.position || !shareholder.numberOfShares || !shareholder.name || !shareholder.surname || !shareholder.dateOfBirth || !shareholder.nationality || !shareholder.email || !shareholder.phonenumber || !shareholder.address || !shareholder.postcode || !shareholder.homeTown || !shareholder.mothersMaidenName || !shareholder.fathersName
                                            return(
                                             <div>
                                                 { page === shareholder.shareholder ? 
                                                 [<h3 className="subtitle is-4">Shareholder {shareholder.shareholder} of {values.shareHolders.length}</h3>,
                                                 <div className="field"> 
                                                    <SelectField label="Position" name={`shareHolders[${index}].position`} options={positionOfShareholderOptions} validate={validateSelectField} />
                                                    <div style={{color:'red'}}>
                                                        {!errors.shareHolders ? null : !errors.shareHolders[index] ? null : errors.shareHolders[index].position ? <p>{errors.shareHolders[index].position}</p> : null }
                                                    </div>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Number of shares holding e.g. 100" name={`shareHolders[${index}].numberOfShares`} validate={validateSharesPerShareholder} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Name" name={`shareHolders[${index}].name`} validate={validateField} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Surname" name={`shareHolders[${index}].surname`} validate={validateField} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Date of Birth DD/MM/YYYY" name={`shareHolders[${index}].dateOfBirth`} validate={validateDOB} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="E-mail" name={`shareHolders[${index}].email`} validate={validateEmail} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Phonenumber" name={`shareHolders[${index}].phonenumber`} validate={validatePhoneNumber} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Address" name={`shareHolders[${index}].address`} validate={validateField} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Postcode" name={`shareHolders[${index}].postcode`} validate={validateField} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="National insurance number" name={`shareHolders[${index}].NINnumber`} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="UTR number" name={`shareHolders[${index}].UTRnumber`} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Nationality" name={`shareHolders[${index}].nationality`} validate={validateField} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Home town" name={`shareHolders[${index}].homeTown`} validate={validateField} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Mothers maiden name" name={`shareHolders[${index}].mothersMaidenName`} validate={validateField} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                    <Field placeholder="Fathers name" name={`shareHolders[${index}].fathersName`} validate={validateField} component={TextField}/>
                                                 </div>,
                                                 <div className="field">
                                                     <label>Copy of ID: </label>
                                                    <FileUpload values={values.shareHolders[index]} uploadedFile={props.uploadedFile} setUploadedFile={props.setUploadedFile}/>
                                                 </div>,
                                                 <div className="buttons">
                                                    <button type="button" onClick={()=>{props.scrollToTop()}}>to the top</button>
                                                    <button type="button" onClick={()=>{console.log(shareholderInfoValidation)}}>check 2 validation</button>
                                                    <button type="button" className="button is-success" disabled={shareholderInfoValidation} onClick={()=>{setPage(page+1)}}>Next</button>
                                                    <button type="button" className="button is-danger is-inverted" onClick={()=>{setPage(page-1)}}>Back</button>
                                                    <div>
                                                        {shareholderInfoValidation ? <p style={{"color": "red"}}>Please check the fields!</p> : null} 
                                                    </div>
                                                 </div>]
                                                  : null }
                                             </div>
                                            )})}
                                        </div>  : null}
                                        {page === values.shareHolders.length + 1 ?
                                                                                [
                                                                                <div >
                                                                                    <Field  placeholder="Aditional informnation" name="message" component={TextArea}/>
                                                                                </div>,
                                                                                <label className="checkbox">
                                                                                    <Field type="checkbox" name="confirmed" checked={values.confirmed}/> I confirm that all information provided is correct 
                                                                                </label>,
                                                                                <div className="buttons" >
                                                                                    <button className="button is-success" type="submit" disabled={!dirty || !isValid || values.confirmed === false}>Submit</button>
                                                                                    <button  type="button" className="button is-success is-inverted" onClick={()=>{setPage(page-1)}}>Back</button>
                                                                                    <div>
                                                                                        {values.confirmed === false ? <p style={{"color": "red"}}>Please confirm!</p> : null} 
                                                                                    </div>
                                                                                </div>
                                                                                
                                                                                ] : null }
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
//perdaryti kad modalas butu app.js ir tada i ten ikelti contact us forma. karocia padaryti kad butu centre tas sudas nes jau zajibalka 