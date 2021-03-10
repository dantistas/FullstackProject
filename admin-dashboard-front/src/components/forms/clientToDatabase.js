import React,{useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import {TextField, TextArea, FileUpload, SelectField} from './FormField'
import { Fab } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios'
import clientDatabaseServices from '../../services/clientsDatabaseServises'


//client searcha ideti i client componenta

const ClientToDatabaseForm = ({type, querie, client, clients, overwrite, saveQuerieToDatabase}) => {

    const [loading, setLoading] = useState("");
    const [serverResponse, setServerResponse] = useState("")

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    //hide  show
    const [requiredInformation, setRequiredInformation] = useState(true)
    const [companyDetails, setCompanyDetails] = useState(false)
    const [mainContact, setMainContact] = useState(false)
    const [accountsAndReturnsDetails, setAccountsAndReturnsDetails] = useState(false)
    const [confirmationStatement, setConfirmationStatement] = useState(false)
    const [vatDetails, setVatDetails] = useState(false)
    const [payeDetails, setPayeDetails] = useState(false)
    const [agentAuthorization, setAgentAuthorization] = useState(false)
    const [initialValuesForForm, setInitialValuesForForm] = useState(null)

    const showWhenVisible = (component) => { return {display: component ? 'block' : 'none'} }
    // iki cia 
    let history = useHistory()
    
    useEffect(()=>{
        if(type === "Overwrite"){
            const {_id, date, __v, ...rest} = client
            setInitialValuesForForm(rest)
            setComments(rest.comments)    // sitas kazka subugina cia 
      }else if(type === "Save to the database") {
          const saveToDatabaseObject = {
            requiredInformation:{
                name: querie.name || "",
                clientType: "",
                manager:"",
                bankName:"",
                sortCode:"",
                accountNumber:"",
                iban:""
            },
            companyDetails:{
                companyName: querie.companyName || "",
                companyNumber: querie.companyNumber || "",
                companyStatus:"",
                incorporationDate:"",
                registeredAddress:"",
                companyPostalAddress:"",
                companyEmail:"",
                sicCode:"",
                natureOfBusiness:"",
                companyUtr:"",
                companiesHouseAuthentificationNumber:"",
                disolvedOn:"",
            },
            mainContact:{
                firstName:"",
                middleName:"",
                lastName:"",
                dateOfBirth:"",
                deceased:"",
                email: querie.email || "",
                telephone: querie.telephone || "",
                ninNumber:"",
                utrNumber:"",
                idVerified:"",
                maritalStatus:"",
                nationality:"",
            },
            accountsAndReturnsDetails:{
                companiesHouseYearEnd:"",
                hmrcYearEnd:"",
                latestAction:"",        
            },
            confirmationStatement:{
                confirmationStatementDate:"",
                shareCapital:"",
                shareholder:"",
                peopleWithSignificantControl:"",
                latestAction:""
            },
            vatDetails:{
                vatFrequency:"",
                vatPeriodEnd:"",
                latestAction:"",
                vatNumber:"",
                eoriNumber:"",
                vatAddress:"",
                dateOfRegistration:"",
                effectiveVatDate:"",
                estimatedTurnover:"",
                mtd:"",
                box5LastQuarterSubmitted:"",
                vatDeregistrationDate:""
            },
            payeDetails:{
                employersReference:"",
                accountsOfficeRefference:"",
                pensionProvider:"",
                pensionId:"",
                declarationOfComplianceSubmission:"",
                p11d:"",
                cis:"",
            },
            agentAuthorization:{
                corporationTax:"",
                paye:"",
                cis:""
            },
            comments:[]
        }
        setInitialValuesForForm(saveToDatabaseObject)
      } else {
          const defaultFormObject = {
            requiredInformation:{
                name: "",
                clientType: "",
                manager:"",
                bankName:"",
                sortCode:"",
                accountNumber:"",
                iban:""
            },
            companyDetails:{
                companyName: "",
                companyNumber:"",
                companyStatus:"",
                incorporationDate:"",
                registeredAddress:"",
                companyPostalAddress:"",
                companyEmail:"",
                sicCode:"",
                natureOfBusiness:"",
                companyUtr:"",
                companiesHouseAuthentificationNumber:"",
                disolvedOn:"",
            },
            mainContact:{
                firstName:"",
                middleName:"",
                lastName:"",
                dateOfBirth:"",
                deceased:"",
                email:"",
                telephone:"",
                ninNumber:"",
                utrNumber:"",
                idVerified:"",
                maritalStatus:"",
                nationality:"",
            },
            accountsAndReturnsDetails:{
                companiesHouseYearEnd:"",
                hmrcYearEnd:"",
                latestAction:"",        
            },
            confirmationStatement:{
                confirmationStatementDate:"",
                shareCapital:"",
                shareholder:"",
                peopleWithSignificantControl:"",
                latestAction:""
            },
            vatDetails:{
                vatFrequency:"",
                vatPeriodEnd:"",
                latestAction:"",
                vatNumber:"",
                eoriNumber:"",
                vatAddress:"",
                dateOfRegistration:"",
                effectiveVatDate:"",
                estimatedTurnover:"",
                mtd:"",
                box5LastQuarterSubmitted:"",
                vatDeregistrationDate:""
            },
            payeDetails:{
                employersReference:"",
                accountsOfficeRefference:"",
                pensionProvider:"",
                pensionId:"",
                declarationOfComplianceSubmission:"",
                p11d:"",
                cis:"",
            },
            agentAuthorization:{
                corporationTax:"",
                paye:"",
                cis:""
            },
            comments:[]
        }
        setInitialValuesForForm(defaultFormObject)
      }
    },[client])


    const validateNameField = (value) => {
        let errorMessage;
        if(!value){
            errorMessage = "Name is required"
        }
        return errorMessage
    } 


    

    const generateOptions = (values) => {
        return values.map((value) => ({value: value, label:value}))

    }
    


    const handleSubmit = (values) => {
        if(type === "Overwrite" ) {
            overwrite(values)
        }else if (type === "Save to the database"){
            saveQuerieToDatabase(values)
        }else if (type === "Add new client"){
            clientDatabaseServices.createClient(values)
            history.push('/clients')
        }
    }

return(
        <div style={{"paddingTop":"50px"}}>
            <Formik 
                    enableReinitialize={true}
                    initialValues={
                        initialValuesForForm        
                    }
                    onSubmit={
                        handleSubmit}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                return(
                                    <Form>
                                        <div className="columns">
                                            <div className="column">
                                                    <div id="form-component-div">
                                                        <div id="form-component-title">
                                                            <h1 className="subtitle">Required information</h1>
                                                            <a id="expand-button" as="button" onClick={()=>{setRequiredInformation(!requiredInformation)}}>
                                                                {requiredInformation ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                                                            </a>
                                                        </div>
                                                        <div style={showWhenVisible(requiredInformation)}>
                                                            <div className="field">
                                                                <Field label="Name:" placeholder="John Doe" name="requiredInformation.name" component={TextField} validate={validateNameField}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="Client type:" name="requiredInformation.clientType" options={generateOptions(["Private limited company","Self assessment", "LLP", "Charity", "Other"])}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Manager:" placeholder="Valatkevičiukas" name="requiredInformation.manager" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Bank name:" placeholder="Lloyds bankas" name="requiredInformation.bankName" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Sort code:" placeholder="xx-xx-xx" name="requiredInformation.sortCode" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Account number:" placeholder="xxxxxxxxxx" name="requiredInformation.accountNumber" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="IBAN:" placeholder="GB XXXX XXXX XX" name="requiredInformation.iban" component={TextField}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="form-component-padding"></div>
                                                    <div id="form-component-div">
                                                        <div id="form-component-title">
                                                            <h1 className="subtitle">Company details</h1>
                                                            <a id="expand-button" as="button" onClick={()=>{setCompanyDetails(!companyDetails)}}>
                                                                {companyDetails ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                                                            </a>
                                                        </div>
                                                        <div style={showWhenVisible(companyDetails)}>
                                                        <div className="field">
                                                                <Field label="Company name:" placeholder="company name" name="companyDetails.companyName" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Company number:" placeholder="XXXXXXXXXX" name="companyDetails.companyNumber" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="Company status:" name="companyDetails.companyStatus" options={generateOptions(["Active","Dissolved", "Other"])}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Incorporation date:" placeholder="DD/MM/YYYY" name="companyDetails.incorporationDate" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Registered address:" placeholder="street name and number" name="companyDetails.registeredAddress" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Company postal address:" placeholder="postcode" name="companyDetails.companyPostalAddress" component={TextField}/>
                                                            </div>                                                
                                                            <div className="field">
                                                                <Field label="Company email:" placeholder="example@domain.com" name="companyDetails.companyEmail" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="SIC code:" placeholder="XXXXX" name="companyDetails.sicCode" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Nature of business:" placeholder="purpose of business" name="companyDetails.natureOfBusiness" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Company UTR number:" placeholder="XXXXXXXXXXX" name="companyDetails.companyUtr" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Companys authentification number:" placeholder="RUXXXXXXXXX" name="companyDetails.companiesHouseAuthentificationNumber" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Disolved on:" placeholder="DD/MM/YYYY" name="companyDetails.disolvedOn" component={TextField}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="form-component-padding"></div>
                                                    <div id="form-component-div">
                                                        <div id="form-component-title" >
                                                            <h1 className="subtitle">Main contact</h1>
                                                            <a id="expand-button" as="button" onClick={()=>{setMainContact(!mainContact)}}>
                                                                {mainContact ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                                                            </a>
                                                        </div>
                                                        <div style={showWhenVisible(mainContact)}>
                                                            <div className="field">
                                                                <Field label="First name:" placeholder="Antanas" name="mainContact.firstName" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Middle name:" placeholder="Antanovicius" name="mainContact.middleName" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Last name:" placeholder="Antanaviciukas" name="mainContact.lastName" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Date of birth:" placeholder="DD/MM/YYYY" name="mainContact.dateOfBirth" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Deceased:" placeholder="DD/MM/YYYY" name="mainContact.deceased" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Email:" placeholder="example@domain.com" name="mainContact.email" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Telephone:" placeholder="07XXXXXXX" name="mainContact.telephone" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="NIN number:" placeholder="ABXXXXXXA" name="mainContact.ninNumber" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="UTR number:" placeholder="XXXXXXXXX" name="mainContact.utrNumber" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="ID verified:" name="mainContact.idVerified" options={generateOptions(["YES", "NO"])}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="Marital status:" name="mainContact.maritalStatus" options={generateOptions(["Married","Widowed", "Divorced", "Single"])}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Nationality:" placeholder="rusas" name="mainContact.nationality" component={TextField}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="form-component-padding"></div>
                                                    <div id="form-component-div">
                                                        <div id="form-component-title" >
                                                            <h1 className="subtitle">Accounts and returns details</h1>
                                                            <a id="expand-button" as="button" onClick={()=>{setAccountsAndReturnsDetails(!accountsAndReturnsDetails)}}>
                                                                {accountsAndReturnsDetails ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                                                            </a>
                                                        </div>
                                                        <div style={showWhenVisible(accountsAndReturnsDetails)}>
                                                            <div className="field">
                                                                <Field label="Companies house year end:" placeholder="DD/MM/YYYY" name="accountsAndReturnsDetails.companiesHouseYearEnd" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="HMRC year end:" placeholder="DD/MM/YYYY" name="accountsAndReturnsDetails.hmrcYearEnd" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="Latest action:" name="accountsAndReturnsDetails.latestAction" options={generateOptions(["Records requested","Records received", "In progress", "Queries sent", "Completed"])}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="form-component-padding"></div>
                                                <div className="column">
                                                    <div id="form-component-div">
                                                        <div id="form-component-title" >
                                                            <h1 className="subtitle">Confirmation statement</h1>
                                                            <a id="expand-button" as="button" onClick={()=>{setConfirmationStatement(!confirmationStatement)}}>
                                                                {confirmationStatement ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                                                            </a>
                                                        </div>
                                                        <div style={showWhenVisible(confirmationStatement)}>
                                                            <div className="field">
                                                                <Field label="Confirmation statement date:" placeholder="DD/MM/YYYY" name="confirmationStatement.confirmationStatementDate" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Share capital:" placeholder="Kevin" name="confirmationStatement.shareCapital" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Shareholder:" placeholder="Gedas" name="confirmationStatement.shareholder" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="People with significant control:" placeholder="Jay Curry" name="confirmationStatement.peopleWithSignificantControl" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="Latest action:" name="confirmationStatement.latestAction" options={generateOptions(["Records requested","Records received", "In progress", "Queries sent", "Completed"])}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="form-component-padding"></div>
                                                    <div id="form-component-div">
                                                        <div id="form-component-title" >
                                                            <h1 className="subtitle">VAT details</h1>
                                                            <a id="expand-button" as="button" onClick={()=>{setVatDetails(!vatDetails)}}>
                                                                {vatDetails ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                                                            </a>
                                                        </div>
                                                        <div style={showWhenVisible(vatDetails)}>
                                                            <div className="field">
                                                                <SelectField label="VAT frequency:" name="vatDetails.vatFrequency" options={generateOptions(["Quarterly","Monthly", "Yearly", "Other"])}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="VAT period end:" placeholder="DD/MM/YYYY" name="vatDetails.vatPeriodEnd" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="VAT frequency:" name="vatDetails.latestAction" options={generateOptions(["Records requested","Records received", "In progress", "Queries sent", "Completed"])}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="VAT number:" placeholder="123456789" name="vatDetails.vatNumber" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="EORI number:" placeholder="GB123456789" name="vatDetails.eoriNumber" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="VAT number:" placeholder="Full adress" name="vatDetails.vatAddress" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Date of registration:" placeholder="DD/MM/YYYY" name="vatDetails.dateOfRegistration" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Effective VAT date:" placeholder="DD/MM/YYYY" name="vatDetails.effectiveVatDate" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Estimated turnover:" placeholder="£100,000" name="vatDetails.estimatedTurnover" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="MTD:" name="vatDetails.mtd" options={generateOptions(["Yes", "No"])}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Box 5 last quarter submitted:" placeholder="£20125.63" name="vatDetails.box5LastQuarterSubmitted" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="VAT de-registration date:" placeholder="DD/MM/YYYY" name="vatDetails.vatDeregistrationDate" component={TextField}/>
                                                            </div>
                                                        </div>    
                                                    </div>
                                                    <div id="form-component-padding"></div>
                                                    <div id="form-component-div">
                                                        <div id="form-component-title" >
                                                            <h1 className="subtitle">PAYE details</h1>
                                                            <a id="expand-button" as="button" onClick={()=>{setPayeDetails(!payeDetails)}}>
                                                                {payeDetails ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                                                            </a>
                                                        </div>
                                                        <div style={showWhenVisible(payeDetails)}>
                                                            <div className="field">
                                                                <Field label="Employers reference:" placeholder="120/FB00000000" name="payeDetails.employersReference" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Accounts office reference:" placeholder="120PD0000000000" name="payeDetails.accountsOfficeRefference" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Pension provider:" placeholder="NEST" name="payeDetails.pensionProvider" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Pension ID:" placeholder="123456789" name="payeDetails.pensionId" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <Field label="Declaration of compliance submission:" placeholder="DD/MM/YYYY" name="payeDetails.declarationOfComplianceSubmission" component={TextField}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="P11D:" name="payeDetails.p11d" options={generateOptions(["Yes", "No"])}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="CIS:" name="payeDetails.cis" options={generateOptions(["Yes", "No"])}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="form-component-padding"></div>
                                                    <div id="form-component-div">
                                                        <div id="form-component-title" >
                                                            <h1 className="subtitle">Agent authorization</h1>
                                                            <a id="expand-button" as="button" onClick={()=>{setAgentAuthorization(!agentAuthorization)}}>
                                                                {agentAuthorization ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                                                            </a>
                                                        </div>
                                                        <div style={showWhenVisible(agentAuthorization)}>                                               
                                                            <div className="field">
                                                                <SelectField label="Corporation tax:" name="agentAuthorization.corporationTax" options={generateOptions(["Yes", "No"])}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="PAYE:" name="agentAuthorization.paye" options={generateOptions(["Yes", "No"])}/>
                                                            </div>
                                                            <div className="field">
                                                                <SelectField label="CIS:" name="agentAuthorization.cis" options={generateOptions(["Yes", "No"])}/>
                                                            </div>
                                                        </div> 
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="form-component-padding"></div>
                                                <div className="columns" id="comments-section">
                                                    <div className="column">
                                                        <div id="comment-div" className="field">
                                                            <textarea id="comment" className="textarea" value={comment} onChange={(e)=>{setComment(e.target.value)}} placeholder="Your comment..."></textarea>
                                                            <a role="button" onClick={()=>{
                                                                if(comment){
                                                                    let commentObject = {
                                                                        comment: comment,
                                                                        date: new Date().toString()
                                                                    }
                                                                    values.comments.push(commentObject)
                                                                    setComments(values.comments)
                                                                    setComment("")
                                                                    
                                                                }else{window.alert('There is no value in the comment section')}
                                                            }}><AddIcon fontSize="large"/></a>
                                                        </div>
                                                    </div>
                                                    <div className="column">
                                                        <h1 className="subtitle">Comments</h1>
                                                        {comments.length === 0 ? <p>no comments yet</p> : 
                                                            <div>
                                                                <ul>
                                                                    {comments.map((comment) => {

                                                                        const indexOfComment = comments.indexOf(comment)
                                                                        const eraseComment = (index)=>{
                                                                            const allComments = [...comments]
                                                                            allComments.splice(index, 1)
                                                                            setComments(allComments)
                                                                            values.comments = allComments
                                                                        }

                                                                    return (
                                                                        <div>
                                                                            <div id="comment-div">
                                                                                <p>{" " + comment.comment + " | " + comment.date.split('GMT')[0]  }</p> 
                                                                                <a type="button" onClick={()=>{eraseComment(indexOfComment)}}><DeleteForeverIcon/></a>  
                                                                            </div>
                                                                            <div style={{"paddingBottom": "5px"}}></div>
                                                                        </div>  
                                                                        )
                                                                    } 
                                                                    )}
                                                                </ul>
                                                                
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{"paddingTop":"10px" , "width":"260px"}}>
                                                        <button type="button" onClick={()=>{console.log(comments)}}>comments</button>
                                                        <button type="button" onClick={()=>{console.log(comment)}}>comment</button>
                                                        <button type="button" onClick={()=>{console.log(values)}}>values</button>
                                                    <button className="button is-success" disabled={values ? !values.requiredInformation.name : !dirty}  type="submit" onClick={()=>{values.date = new Date().toString()}}>{type}</button>
                                                </div>
                                                <div id="submit-button">
                                                    {/* <button role="button" type="submit" disabled={values ? !values.requiredInformation.name : !dirty} onClick={()=>{console.log("SWX")}}>
                                                        <Fab>
                                                            <SaveIcon style={{"color":"hsl(141, 53%, 53%)"}} fontSize="large"/>
                                                        </Fab>
                                                    </button> */}
                                                    <button className="button is-success" disabled={values ? !values.requiredInformation.name : !dirty}  type="submit" onClick={()=>{values.date = new Date().toString()}}>{type}</button>
                                                </div>
                                    </Form>
                                    )
                                }
                            }  
            </Formik>
        </div>
    )
}

export default ClientToDatabaseForm