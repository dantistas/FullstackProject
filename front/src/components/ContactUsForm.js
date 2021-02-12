import React, { useState, useRef } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import OtherQueries from './Forms/OtherQueries'
import SelfEmployed from './Forms/SelfEmployed'
import CompanyMAtters from './Forms/CompanyMatters'
import NewCompanyEstablish from './Forms/NewCompanyEstablish'




const ContactUsForm = (props) => {
    const [type, setType] = useState(null)
    const [loading, setLoading]= useState(false)
    const [serverResponse, setServerResponse] = useState("")
    const [uploadedFile, setUploadedFile] = useState([])

    let history = useHistory()
    
    const handleSelectFieldChange = (event) => {
        setType(event.target.value)
        setUploadedFile([])
    }

    const handleSubmit = (values) => {
        setLoading("loading")
        setType(null)
        let formData = new FormData()
        formData.append("values", JSON.stringify(values) )
        if(uploadedFile !== null){
            for(let i = 0; i< uploadedFile.length ; i ++){
                formData.append('file', uploadedFile[i])
            }  
        } 
        axios.post('/swx', formData).then((response) => {
            if(response.data.successful){
                setServerResponse(response.data.successful)
                setLoading("successful")

            }else if(response.data.error){
                setServerResponse(response.data.error)
                setLoading("error")
            }else{
                setServerResponse("error")
                setLoading("error")
            }
        })
    }

    const changeTitleLanguage = (en, lt) => {
        if(props.language === "en"){
            return en
        }else if(props.language === "lt") {
            return lt
        }
    }

    const krc ={
            "padding": "10px",
            "width" : "375px"
            
    }


    const topRef = React.useRef(null);
    
    const scrollToTop = () => {
        topRef.current.scrollIntoView(
            {
                behavior: "smooth",
                 block: "end", 
                 inline: "start"
            }
        ); 
    };


    return (
        <div>
                <div className="container px-5">
                  <p className="title">{changeTitleLanguage("Contact us", "Susisiekite su mumis")}</p>
                </div>
                  <div className="modal-content py-4 px-6" style={krc}> 
                    <div className="columns is-vcentered is-centered py-3" style={{"paddingTop":"10px" , "width":"300px"}}>
                      <div className="column is-centered" >
                        { loading === "loading" ? 
                                <div className="loader-wrapper" style={{"height":"100%", "width":"250px", "display":"flex","justifyContent":"center","alignItems":"center"}}>
                                    <div className="loader is-loading" style={{"height":"100px", "width":"100px"}}></div>
                                </div> 
                                :
                                loading === "successful" ?
                                                        <div className="notification is-success" style={{"width":"250px"}}>
                                                            <button className="delete" onClick={()=>{setLoading(false)}}></button>
                                                            <p className="subtitle">{serverResponse}</p>
                                                        </div>
                                :
                                loading === "error" ?
                                                    <div className="notification is-danger" style={{"width":"250px"}}>
                                                        <button className="delete" onClick={()=>{setLoading(false)}}></button>
                                                        <p className="subtitle">{serverResponse}</p>
                                                    </div>
                                :
                                <div className="select" style={{"paddingBottom": "5px"}} ref={topRef} >
                                    <select style={{"width":"260px"}} onChange={handleSelectFieldChange}>
                                        <option disabled selected>{changeTitleLanguage("Reason for contacting us", "Priežastis")}</option>
                                        <option value="General queries">{changeTitleLanguage("General queries", "Bendri klausimai")}</option>
                                        <option value="Set up a private limited company">{changeTitleLanguage("Set up a private limited company", "Naujos įmonės įsteigimas")}</option>
                                        <option value="Company matters">{changeTitleLanguage("Company matters","Įmonės reikalai")}</option>
                                        <option value="Self-employment queries">{changeTitleLanguage("Self-employment queries", "Besiverčiantys privačia veikla")}</option>
                                    </select>
                                </div>
                        }
                        {type === "General queries" ? <OtherQueries  changeTitleLanguage={changeTitleLanguage} type={type} handleSubmit={handleSubmit} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}/> : null}
                        {type === "Self-employment queries" ? <SelfEmployed changeTitleLanguage={changeTitleLanguage} type={type} handleSubmit={handleSubmit} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}/> : null}
                        {type === "Company matters" ? <CompanyMAtters changeTitleLanguage={changeTitleLanguage} type={type} handleSubmit={handleSubmit} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}/> : null}
                        {type === "Set up a private limited company" ? <NewCompanyEstablish changeTitleLanguage={changeTitleLanguage} scrollToTop={scrollToTop} type={type} handleSubmit={handleSubmit} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} /> : null}                     
                      </div>
                    </div>
                        <button onClick={props.location ==="/webchat" ? ()=>{history.push("/")} : ()=>{{props.toggleVisibility();setLoading(false);setUploadedFile([])}}} className="modal-close is-large" aria-label="close"></button>
                  </div>
            </div>
    )

}


export default ContactUsForm