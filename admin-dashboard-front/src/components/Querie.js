import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import GeneralQuerie from './queries/GeneralQuerie'
import CompanyMatersQuerie from './queries/CompanyMattersQuerie'
import NewCompanyEstablishQuerie from './queries/NewCompanyEstablishQuerie'
import SeflEmployedQuerie from './queries/SelfEmployedQuerie'


import clientDatabaseServices from '../services/clientsDatabase'


import ClientToDatabaseForm from './forms/clientToDatabase'




const Querie = ({allNewQueries}) => {
    const [visible, setVisible] = useState(false)
    const [querie, setQuerie] = useState([])
    const [thumbnail, setThumbnail] = useState([])
    const [loading, setLoading] = useState("");
    const [serverResponse, setServerResponse] = useState("")

    let { id } = useParams();

   useEffect(()=>{
    Object.entries(allNewQueries).forEach((querieGroup)=>{querieGroup[1].filter((querie)=>{
        if(querie._id === id){
            setQuerie(querie)
        }})})
        // axios.get('http://localhost:3001/api/get-thumbnail').then((res)=>{
        //         setThumbnail(res.data)  
        //         console.log("pavyko")
        //     })
    
   },[])


   const handleSubmit = (values) => {
    setLoading("loading")
    // clientDatabaseServices.updatedClient('603d1558243ae66b2c865804',values).then((response)=>{
    //     setServerResponse(response.successful)
    // })
    clientDatabaseServices.createClient(values).then((response)=>{
        if(response.successful){
            setServerResponse(response.successful)
            setLoading("successful")

        }else if(response.error){
            setServerResponse(response.error)
            setLoading("error")
        }else{
            setServerResponse("error")
            setLoading("error")
        }
    })
}

// useEffect(()=>{
//     if(querie.type === "General queries"){
//         axios.get('http://localhost:3001/api/get-thumbnail').then((res)=>{
//             setFlinas(res.data)
//         })
//     }else if(querie.type === "Company matters"){
//         console.log(querie.file)
//     }else if(querie.type === "Set up a private limited company"){
//         querie.shareHolders.forEach((shareholder)=>{console.log(shareholder.file)})
//     }else if(querie.type === "Self-employment queries"){
//         console.log(querie.file)
//     }
// })
    
 
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
                <ClientToDatabaseForm querie={querie} handleSubmit={handleSubmit}/>
                {querie.type === "General queries" ? <GeneralQuerie querie={querie}/> : querie.type === "Company matters" ? <CompanyMatersQuerie/> : querie.type === "Set up a private limited company" ? <NewCompanyEstablishQuerie/> : querie.type === "Self-employment queries" ? <SeflEmployedQuerie/> : null }
            </div>
        </div>
    </div>
)

}



export default Querie



// gerai baxuras zeurei gerai pavarei cia pagirtina rytojuj --> per propsus ideti visus tuos querius ir per querius surasti butent 
//sito _id query , tada viskas tas pats ir idedi thumbnaila, vsio finisas
