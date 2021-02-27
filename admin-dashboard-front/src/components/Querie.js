import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import GeneralQuerie from './queries/GeneralQuerie'
import CompanyMatersQuerie from './queries/CompanyMattersQuerie'
import NewCompanyEstablishQuerie from './queries/NewCompanyEstablishQuerie'
import SeflEmployedQuerie from './queries/SelfEmployedQuerie'



import ClientToDatabaseForm from './forms/clientToDatabase'




const Querie = () => {
    const [visible, setVisible] = useState(false)
    const [flinas, setFlinas] = useState([])

    let { id } = useParams();

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

    console.log("EIK TU NXAXUI")

return (
    <div style={{"border": "solid"}}>
        <div>{id}</div>
        {/* {flinas ?<img src={``}></img> :null }
        <button onClick={()=>{console.log(visible)}}>steitas</button>
        {querie._id}
        <button onClick={()=>{toggleVisibility()}}>{!visible ? "view" : "hide"}</button>
        <button>delete</button>
        <p><strong>{querie.name}</strong> | {querie.date}</p>
        <div style={showWhenVisible}>
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
                        }else {
                            return(
                                <div>
                                    <p><strong>{key.split(/(?=[A-Z])/).join(" ")}</strong> : {querie[key]}</p>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <ClientToDatabaseForm querie={querie}/>
            {querie.type === "General queries" ? <GeneralQuerie querie={querie}/> : querie.type === "Company matters" ? <CompanyMatersQuerie/> : querie.type === "Set up a private limited company" ? <NewCompanyEstablishQuerie/> : querie.type === "Self-employment queries" ? <SeflEmployedQuerie/> : null }
        </div> */}
    </div>
)

}



export default Querie



// gerai baxuras zeurei gerai pavarei cia pagirtina rytojuj --> per propsus ideti visus tuos querius ir per querius surasti butent 
//sito _id query , tada viskas tas pats ir idedi thumbnaila, vsio finisas
