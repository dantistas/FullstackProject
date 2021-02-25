import React, { useEffect, useState } from 'react'
import GeneralQuerie from './queries/GeneralQuerie'
import CompanyMatersQuerie from './queries/CompanyMattersQuerie'
import NewCompanyEstablishQuerie from './queries/NewCompanyEstablishQuerie'
import SeflEmployedQuerie from './queries/SelfEmployedQuerie'



import ClientToDatabaseForm from './forms/clientToDatabase'




const Querie = ({querie}) => {
    const [visible, setVisible] = useState(false)
    console.log(13%4)
    const showWhenVisible = { display: visible ? 'block' : 'none' }

    const toggleVisibility = () => {
      setVisible(!visible)
    }
    console.log(querie)
return (
    <div style={{"border": "solid"}}>
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
        </div>
    </div>
)

}



export default Querie