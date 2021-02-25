import React from 'react'
import { Formik, Field, Form } from 'formik';
import {TextField, TextArea, FileUpload, SelectField} from './FormField'




const ClientToDatabaseForm = ({querie}) => {

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


    const generateOptions = (values) => {
    
        return values.map((value) => ({value: value, label:value}))

    }

return(
        <div>
            <Formik 
                    initialValues={{
                                    requiredInformation:{
                                        name: "",
                                        clientType:"",
                                        manager:"",
                                        bankName:"",
                                        sortCode:"",
                                        accountNumber:"",
                                        IBAN:""
                                    },
                                    companyDetails:{
                                        companyNumber:"",
                                        companyStatus:"",
                                        incorporationDate:"",
                                        registeredAddress:"",
                                        companyPostalAddress:"",
                                        companyEmail:"",
                                        sicCode:"",
                                        natureOfbusiness:"",
                                        companyUTR:"",
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
                                        IDverified:"",
                                        maritalStatus:"",
                                        nationality:"",
                                    },
                                    accountsAndReturnsDetails:{
                                        companiesHouseYearEnd:"",
                                        HMRCyearEND:"",
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
                                        dateOfregistration:"",
                                        effectiveVatDate:"",
                                        estimatedTurnover:"",
                                        MTD:"",
                                        box5LastQuarterSubmitted:"",
                                        vatDeregistrationDate:""
                                    },
                                    payeDetails:{
                                        employersReference:"",
                                        accountsOfficeRefference:"",
                                        pensionProvider:"",
                                        pensionID:"",
                                        declarationOfComplianceSubmission:"",
                                        P11D:"",
                                        CIS:"",
                                    },
                                    agentAuthorization:{
                                        corporationTax:"",
                                        PAYE:"",
                                        CIS:""
                                    }
                                }}
                    onSubmit={()=>{console.log("zjbs")}}
                            >
                            {({ isValid, dirty, setFieldValue, setFieldTouched, values, errors, touched})=>{
                                return(
                                    <Form style={{"paddingTop":"10px" , "width":"260px"}}>
                                            <div>
                                                <h1>Required information:</h1>
                                                <div className="field">
                                                    <Field label="Name:" placeholder="John" name="requiredInformation.name" component={TextField}/>
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
                                                    <Field label="IBAN:" placeholder="GB XXXX XXXX XX" name="requiredInformation.IBAN" component={TextField}/>
                                                </div>
                                            </div>
                                            <div>
                                                <h1>Company details:</h1>
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
                                                    <Field label="Nature of business:" placeholder="purpose of business" name="companyDetails.natureOfbusiness" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="Company UTR number:" placeholder="XXXXXXXXXXX" name="companyDetails.companyUTR" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="Companys authentification number:" placeholder="RUXXXXXXXXX" name="companyDetails.companiesHouseAuthentificationNumber" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="Disolved on:" placeholder="DD/MM/YYYY" name="companyDetails.disolvedOn" component={TextField}/>
                                                </div>
                                            </div>
                                            <div>
                                                <h1>Main contact:</h1>
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
                                                    <SelectField label="ID verified:" name="mainContact.IDverified" options={generateOptions(["YES", "NO"])}/>
                                                </div>
                                                <div className="field">
                                                    <SelectField label="Marital status:" name="mainContact.maritalStatus" options={generateOptions(["Married","Widowed", "Divorced", "Single"])}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="Nationality:" placeholder="rusas" name="mainContact.nationality" component={TextField}/>
                                                </div>
                                            </div>
                                            <div>
                                                <h1>Accounts and returns details:</h1>
                                                <div className="field">
                                                    <Field label="Companies house year end:" placeholder="DD/MM/YYYY" name="accountsAndReturnsDetails.companiesHouseYearEnd" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="HMRC year end:" placeholder="DD/MM/YYYY" name="accountsAndReturnsDetails.HMRCyearEND" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <SelectField label="Latest action:" name="accountsAndReturnsDetails.latestAction" options={generateOptions(["Records requested","Records received", "In progress", "Queries sent", "Completed"])}/>
                                                </div>
                                            </div>
                                            <div>
                                                <h1>Confirmation statement:</h1>
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
                                            <div>
                                                <h1>VAT details:</h1>
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
                                                    <Field label="Date of registration:" placeholder="DD/MM/YYYY" name="vatDetails.dateOfregistration" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="Effective VAT date:" placeholder="DD/MM/YYYY" name="vatDetails.effectiveVatDate" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="Estimated turnover:" placeholder="£100,000" name="vatDetails.estimatedTurnover" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <SelectField label="MTD:" name="vatDetails.MTD" options={generateOptions(["Yes", "No"])}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="Box 5 last quarter submitted:" placeholder="£20125.63" name="vatDetails.box5LastQuarterSubmitted" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="VAT de-registration date:" placeholder="DD/MM/YYYY" name="vatDetails.vatDeregistrationDate" component={TextField}/>
                                                </div>
                                            </div>
                                            <div>
                                                <h1>PAYE details:</h1>
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
                                                    <Field label="Pension ID:" placeholder="123456789" name="payeDetails.pensionID" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="Declaration of compliance submission:" placeholder="DD/MM/YYYY" name="payeDetails.declarationOfComplianceSubmission" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <Field label="Declaration of compliance submission:" placeholder="DD/MM/YYYY" name="payeDetails.declarationOfComplianceSubmission" component={TextField}/>
                                                </div>
                                                <div className="field">
                                                    <SelectField label="P11D:" name="payeDetails.P11D" options={generateOptions(["Yes", "No"])}/>
                                                </div>
                                                <div className="field">
                                                    <SelectField label="CIS:" name="payeDetails.CIS" options={generateOptions(["Yes", "No"])}/>
                                                </div>
                                            </div>
                                            <div>
                                                <h1>Agent authorization:</h1>
                                                <div className="field">
                                                    <SelectField label="Corporation tax:" name="agentAuthorization.corporationTax" options={generateOptions(["Yes", "No"])}/>
                                                </div>
                                                <div className="field">
                                                    <SelectField label="PAYE:" name="agentAuthorization.PAYE" options={generateOptions(["Yes", "No"])}/>
                                                </div>
                                                <div className="field">
                                                    <SelectField label="CIS:" name="agentAuthorization.CIS" options={generateOptions(["Yes", "No"])}/>
                                                </div>
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

export default ClientToDatabaseForm