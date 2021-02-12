import React, {useState} from 'react'
import { Formik, Field, Form } from 'formik';
import {TextField, TextArea, FileUpload, SelectField, NumberField} from './FormField'




const NewCompanyEstablish = (props) => {
    const [page, setPage] = useState(0)
    const [shares, setShares] = useState(0)

    const validateEmail = (value) => {
        let errorMessage;
        if(!value){
            errorMessage=props.changeTitleLanguage("Field is required", "Privalomas laukelis")
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
    
    const validateNumberField = (value) => {
        let errorMessage
        if(!value){
            errorMessage = props.changeTitleLanguage("Field is required", "Privalomas laukelis")
        }else if (isNaN(value)){
            errorMessage = props.changeTitleLanguage("Invalid value", "Turi būti numeris")
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

    const validateNumberOfShareHolders = (value) => {
        let errorMessage;
        if(value < 1 || value === 0 || !value){
            errorMessage = props.changeTitleLanguage("Field is required or value is invalid", "Privalomas laukelis arba neteisingas santykis")
        }else if (isNaN(value)){
            errorMessage = props.changeTitleLanguage("Must be a number", "Privalo būti numeris")
        }else if(value > 3){
            errorMessage = props.changeTitleLanguage("If more than 3 shareholders contact us directly", "Jeigu daugiau negu 3 akcininkai, paskambinkite mums")
        }
        return errorMessage

    }

    const validateSelectField = (value) =>{
        let errorMessage;
        if(!value){
            errorMessage = props.changeTitleLanguage("Field is required", "Privalomas laukelis")
        }
        if(value === "Type of the company"){
            errorMessage = props.changeTitleLanguage("Please select type of the company", "Pasirinkite kompanijos rūšį")
        }
        if(value === "Position of shareholder"){
            errorMessage = props.changeTitleLanguage("Please select position of the shareholder", "Pasrininkite akcininko pozicija")
        }
        return errorMessage
    }

    const validateSharesPerShareholder = (value) => {
        let errorMessage;
        if(!value){
            errorMessage= props.changeTitleLanguage("Field is required", "Privalomas laukelis")
        }
        if(isNaN(value)){
            errorMessage = props.changeTitleLanguage("Value must be a number", "Privalo būti numeris")
        }
        setShares(shares - value)
        return errorMessage
    }

    const validateDOB = (value) => {
        let errorMessage;
        const datePatern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
        if(!value){
            errorMessage = props.changeTitleLanguage("Field is required", "Privalomas laukelis")
        }
        if(!datePatern.test(value)){
            errorMessage = props.changeTitleLanguage("Invalid value of date of birth", "Neteisingas datos formatas, pabandykite Diena/Mėnesis/Metai")
        }
        return errorMessage
    }

    
    const typeOfCompanyOptions = [
        { value: null, label: props.changeTitleLanguage("Type of the company", "Įmonės tipas")},
        { value: "LTD" , label: "LTD" },
        { value: "LIMITED" , label: "LIMITED" }
    ]

    const positionOfShareholderOptions = [
        { value: null, label: props.changeTitleLanguage("Position of shareholder", "Akcininko pozicija") },
        { value: "Director" , label: props.changeTitleLanguage("Director", "Direktorius/ė") },
        { value: "Secretary " , label: props.changeTitleLanguage("Secretary", "Sekretorius/ė")},
        { value: "Only shareholder" , label: props.changeTitleLanguage("Only shareholder", "Tiesiog akcininkas/ė") }
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
        props.scrollToTop()
    }

    const nextPage = () => {
        setPage(page+1)
        props.scrollToTop()
    }

    const previousPage = () => {
        setPage(page-1)
        props.scrollToTop()
    }

    

return(
        <div>
            <Formik 
                    initialValues={{
                                    type: props.type,
                                    name:"",
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
                                    message:"",
                                    date:""

                                }}
                    onSubmit={props.handleSubmit}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                const firstPartValidation = values.numberOfShareHolders > 3 || values.numberOfShareHolders < 1 || errors.alternativeCompanyName || errors.companyAdress || errors.companyPostcode || errors.email || errors.natureOfBusiness || errors.numberOfShareHolders || errors.numberOfShares || errors.preferredCompanyName || errors.telephone || errors.typeOfCompany || errors.valueOfAllShares || errors.name
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                        { page === 0  ? [
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Full name:", "Vardas ir pavardė:")} placeholder={props.changeTitleLanguage("John Smith", "Jonas Petrauskas")} name="name" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Company name:", "Įmonės pavadinimas:")} placeholder={props.changeTitleLanguage("Preferred company name", "Norimas įmonės pavadinimas")} name="preferredCompanyName" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Alternative company name:", "Alternatyvus įmonės pavadnimas:")} placeholder={props.changeTitleLanguage("Alternative company name", "Alternatyvus įmonės pavadnimas")} name="alternativeCompanyName" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <SelectField label="Entry type" name="typeOfCompany" options={typeOfCompanyOptions} validate={validateSelectField}/>
                                                <div style={{color:'red'}}>
                                                    {errors.typeOfCompany ? <p>{props.changeTitleLanguage("Please select a type of a company", "Pasirinkite įmonės tipą")}</p> : null}
                                                </div>
                                            </div>,
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Nature of business:", "Įmonės veikla:")} placeholder={props.changeTitleLanguage("Purpose of the business", "Įmonės veikla")} name="natureOfBusiness" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Email:","Elektroninio pašto adresas:")} placeholder={props.changeTitleLanguage("example@domain.com","pavyzdys@domenas.com")} name="email" validate={validateEmail} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Telephone:","Telefono numeris:")} placeholder="+44..." name="telephone" validate={validatePhoneNumber} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Company Address:","Įmonės adresas:")} placeholder={props.changeTitleLanguage("Street name and house number","Gatvės pavadinimas ir namo numeris")} name="companyAdress" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Postcode:","Pašto kodas:")} placeholder={props.changeTitleLanguage("Postcode of the company","Įmonės pašto kodas")} name="companyPostcode" validate={validateField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Number of shares:","Akcijų kiekis:")} placeholder="100" name="numberOfShares" validate={validateNumberField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Value of shares:","Akcijų vertė:")}  placeholder="1000£" name="valueOfAllShares" validate={validateNumberField} component={TextField}/>
                                            </div>,
                                            <div className="field">
                                                <Field label={props.changeTitleLanguage("Number of Share Holders:","Akcininkų kiekis:")} placeholder="Max 3" name="numberOfShareHolders" component={NumberField} min={1} max={3} validate={validateNumberOfShareHolders}/>
                                            </div>,
                                            <div className="buttons">
                                                <button className="button is-success" disabled={values.numberOfShareHolders > 3 || values.numberOfShareHolders < 1 || firstPartValidation}  type="button" onClick={()=>{createShareholders(values)}}>{props.changeTitleLanguage("Next","Sekantis")}</button>
                                                <div>
                                                   {firstPartValidation ? <p style={{"color": "red"}}>{props.changeTitleLanguage("Please check the fields!","Peržiūrėkite laukelius!")}</p> : null} 
                                                </div>
                                            </div>
                                            ] 
                                        : null }
                                        {page > 0 ? 
                                        <div>
                                            {values.shareHolders.map((shareholder, index)=>{
                                                const shareholderInfoValidation = !errors.shareHolders ? false : !errors.shareHolders[index] ? false  : errors.shareHolders[index].position || errors.shareHolders[index].numberOfShares || errors.shareHolders[index].name || errors.shareHolders[index].surname || errors.shareHolders[index].dateOfBirth || errors.shareHolders[index].nationality || errors.shareHolders[index].email || errors.shareHolders[index].phonenumber || errors.shareHolders[index].address || errors.shareHolders[index].postcode || errors.shareHolders[index].homeTown || errors.shareHolders[index].mothersMaidenName || errors.shareHolders[index].fathersName ?  true :  false
                                                return(
                                                <div>
                                                    { page === shareholder.shareholder ? 
                                                    [<h3 className="subtitle is-4">{props.changeTitleLanguage("Shareholder","Akcininkas")} {shareholder.shareholder} {props.changeTitleLanguage("of","iš")} {values.shareHolders.length}</h3>,
                                                    <div className="field"> 
                                                        <SelectField label="Position" name={`shareHolders[${index}].position`} options={positionOfShareholderOptions} validate={validateSelectField} />
                                                        <div style={{color:'red'}}>
                                                            {!errors.shareHolders ? null : !errors.shareHolders[index] ? null : errors.shareHolders[index].position ? <p>{errors.shareHolders[index].position}</p> : null }
                                                        </div>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Number of shares holding:","Turimų akcijų kiekis:")} placeholder="100" name={`shareHolders[${index}].numberOfShares`} validate={validateSharesPerShareholder} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Name:","Vardas:")} placeholder={props.changeTitleLanguage("John","Jonas")} name={`shareHolders[${index}].name`} validate={validateField} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Surname:","Pavardė:")} placeholder={props.changeTitleLanguage("Smith","Petrauskas")} name={`shareHolders[${index}].surname`} validate={validateField} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Date of birth:","Gimimo data:")} placeholder="DD/MM/YYYY" name={`shareHolders[${index}].dateOfBirth`} validate={validateDOB} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Email:","Elektroninio pašto adresas:")} placeholder={props.changeTitleLanguage("example@domain.com","pavyzdys@domenas.com")} name={`shareHolders[${index}].email`} validate={validateEmail} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Telephone:","Telefono numeris:")} placeholder="+44..." name={`shareHolders[${index}].phonenumber`} validate={validatePhoneNumber} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Address:","Adresas:")} placeholder={props.changeTitleLanguage("Street name and house number","Gatvės pavadinimas ir namo numeris")} name={`shareHolders[${index}].address`} validate={validateField} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Postcode:","Pašto kodas:")} placeholder={props.changeTitleLanguage("Postcode","Pašto kodas")} name={`shareHolders[${index}].postcode`} validate={validateField} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("National insurance number:","National insurance numeris:")} placeholder={props.changeTitleLanguage("Your national insurance number","Jūsų national insurance numeris")} name={`shareHolders[${index}].NINnumber`} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("UTR number:","UTR numeris:")} placeholder={props.changeTitleLanguage("Your UTR number","Jūsų UTR numeris")} name={`shareHolders[${index}].UTRnumber`} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Nationality:","Pilietybė:")} placeholder={props.changeTitleLanguage("British","Lietuvis")} name={`shareHolders[${index}].nationality`} validate={validateField} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Home town:","Gimimo vieta:")} placeholder={props.changeTitleLanguage("Name of the city you were born","Miesto pavadinimas kuriame gimėte")} name={`shareHolders[${index}].homeTown`} validate={validateField} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Mothers maiden name:","Motinos mergautinė pavardė:")} placeholder={props.changeTitleLanguage("Maria","Petrauskaitė")} name={`shareHolders[${index}].mothersMaidenName`} validate={validateField} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <Field label={props.changeTitleLanguage("Fathers name:","Tėvo vardas:")} placeholder={props.changeTitleLanguage("Steve","Antanas")} name={`shareHolders[${index}].fathersName`} validate={validateField} component={TextField}/>
                                                    </div>,
                                                    <div className="field">
                                                        <label>{props.changeTitleLanguage("Copy of ID:","Paso arba ID kortelės kopija:")}</label>
                                                        <FileUpload values={values.shareHolders[index]} uploadedFile={props.uploadedFile} setUploadedFile={props.setUploadedFile}/>
                                                    </div>,
                                                    <div className="buttons">
                                                        <button type="button" className="button is-success" disabled={!shareholder.position || shareholderInfoValidation} onClick={nextPage}>{props.changeTitleLanguage("Next","Sekantis")}</button>
                                                        <button type="button" className="button is-danger is-inverted" onClick={previousPage}>{props.changeTitleLanguage("Back","Atgal")}</button>
                                                        <div>
                                                            {shareholderInfoValidation ? <p style={{"color": "red"}}>{props.changeTitleLanguage("Please check the fields!","Peržiūrėkite laukelius!")}</p> : null} 
                                                        </div>
                                                    </div>]
                                                    : null }
                                                </div>
                                                )})}
                                            </div>  : null}
                                        {page === values.shareHolders.length + 1 ?
                                                                                [
                                                                                <div >
                                                                                    <Field label={props.changeTitleLanguage("Additional information:","Papildoma informacija:")} placeholder="...." name="message" component={TextArea}/>
                                                                                </div>,
                                                                                <label className="checkbox" style={{"color":`${values.confirmed === false ? "red" : "white"}`}}>
                                                                                    <Field type="checkbox" name="confirmed" checked={values.confirmed}/>{props.changeTitleLanguage("I confirm that all information provided is correct","Patvirtinu, kad pateikta informacija yra teisinga")} 
                                                                                </label>,
                                                                                <div className="buttons" >
                                                                                    <button className="button is-success" type="submit" disabled={!dirty || !isValid || values.confirmed === false} onClick={()=>{values.date = new Date().toString()}}>{props.changeTitleLanguage("Submit","Siūsti")}</button>
                                                                                    <button  type="button" className="button is-danger is-inverted" onClick={()=>{setPage(page-1)}}>{props.changeTitleLanguage("Back","Atgal")}</button>
                                                                                </div>
                                                                                
                                                                                ] : null }
                                    </Form>
                                    )
                                }
                            }  
            </Formik>
        </div>
    )
}

export default NewCompanyEstablish



// padaryti po submit kad ismestu nauje modal su res.json