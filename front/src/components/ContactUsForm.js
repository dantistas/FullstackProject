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
    console.log(history)
    
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
        axios.post('http://localhost:3001/swx', formData).then((response) => {
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
                  <p className="title">Contact us</p>
                </div>
                  <div className="modal-content py-4 px-6" style={krc}> 
                    <div className="columns is-vcentered is-centered py-3" style={{"paddingTop":"10px" , "width":"300px"}}>
                      <div className="column is-centered" >
                        { loading === "loading" ? 
                                <div className="loader-wrapper" style={{"height":"100%", "width":"300px", "display":"flex","justifyContent":"center","alignItems":"center"}}>
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
                                        <option disabled selected>Reason for contacting us</option>
                                        <option value="General queries">General queries</option>
                                        <option value="Set up a private limited company">Set up a private limited company</option>
                                        <option value="Company matters">Company matters</option>
                                        <option value="Self-employment queries">Self-employment queries </option>
                                    </select>
                                </div>
                        }
                        {type === "General queries" ? <OtherQueries type={type} handleSubmit={handleSubmit} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}/> : null}
                        {type === "Self-employment queries" ? <SelfEmployed type={type} handleSubmit={handleSubmit} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}/> : null}
                        {type === "Company matters" ? <CompanyMAtters type={type} handleSubmit={handleSubmit} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}/> : null}
                        {type === "Set up a private limited company" ? <NewCompanyEstablish scrollToTop={scrollToTop} type={type} handleSubmit={handleSubmit} uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} /> : null}                     
                      </div>
                    </div>
                        <button onClick={props.location ==="/webchat" ? ()=>{history.push("/")} : ()=>{{props.toggleVisibility();setLoading(false);setUploadedFile([])}}} className="modal-close is-large" aria-label="close"></button>
                  </div>
            </div>
    )

}


export default ContactUsForm