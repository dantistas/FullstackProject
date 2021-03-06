import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios'



import clientDatabaseServices from '../services/clientsDatabaseServises'


import ClientToDatabaseForm from './forms/clientToDatabase'




const Querie = ({allNewQueries, clients}) => {
    const [visible, setVisible] = useState(false)
    const [querie, setQuerie] = useState([])
    const [thumbnail, setThumbnail] = useState([])
    const [loading, setLoading] = useState("");
    const [serverResponse, setServerResponse] = useState("")
    const type = "Save to the database"
    let history = useHistory()

    let { id } = useParams();

   useEffect(()=>{
    Object.entries(allNewQueries).forEach((querieGroup)=>{querieGroup[1].filter((querie)=>{
        if(querie._id === id){
            setQuerie(querie)
        }})})
   },[])

   console.log(querie._id)

   const saveQuerieToDatabase = (values) => {
    setLoading("loading")
    
    const existOrnot = clients.filter(client=> client.requiredInformation.name === values.requiredInformation.name || ( client.mainContact.name && client.mainContact.lastName && values.mainContact.lastName && client.mainContact.name === values.mainContact.name && client.mainContact.lastName === values.mainContact.lastName) )
        if(existOrnot.length > 0){
            const ok = window.confirm( existOrnot.length + ` client(s) with the same name and surname already exist. Do you still want to save it?`)
            if(ok){
                clientDatabaseServices.createClient({...values, id: querie._id}).then((res)=>{console.log(res)})
                // clientDatabaseServices.deleteQuerie(querie.type, querie._id).then((res)=>{console.log(res)})
                // history.push("/new-queries")
                // kai bus reduksas tures cia buti steito atnaujinimas.
            }   
        }else {
            clientDatabaseServices.createClient({...values, id: querie._id}).then((res)=>{console.log(res)})
            // clientDatabaseServices.deleteQuerie(querie.type, querie._id).then((res)=>{console.log(res)})
            // history.push("/new-queries")
        }
}

    const showWhenVisible = { display: visible ? 'block' : 'none' }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

return (
    <div>
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
                                null
                        }
            </div>
        <div style={{"border": "solid"}}>
            <p><strong>{querie.name}</strong> | {querie.date} | <strong>{querie.type}</strong> <button onClick={()=>{clientDatabaseServices.deleteQuerie(querie.type, querie._id).then((res)=>{console.log(res)})}}>delete</button></p>
            <button onClick={()=>{console.log(querie)}}>steitas</button>
            <div>
                <div>
                    {Object.keys(querie).map((key)=>{  // sumepina visa query
                            if(Array.isArray(querie[key])){
                                return (
                                    <div>
                                        <h1>Shareholders</h1>
                                        {querie[key].map((element)=>{
                                            return(
                                                <div>
                                                    {Object.keys(element).map((keyInArray)=>{
                                                        return(
                                                            <div>
                                                                <p><strong>{keyInArray.split(/(?=[A-Z])/).join(" ")}</strong> : {element[keyInArray]}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }else if(key === "file"){
                                return (
                                    <div>
                                        <p><strong>{key}</strong> : <a href={`https://www.dropbox.com/home/ToBeConfirmed/${id}`} target="_blank">{querie[key]}</a></p>
                                    </div>
                                )
                            }
                            else {
                                return(
                                    <div>
                                        <p><strong>{key.split(/(?=[A-Z])/).join(" ")}</strong> : {querie[key]}</p>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                {querie.length !== 0 ? <ClientToDatabaseForm clients={clients} type={type} querie={querie} saveQuerieToDatabase={saveQuerieToDatabase}/> : <p>Querie not found </p>}
            </div>
        </div>
    </div>
)

}



export default Querie
