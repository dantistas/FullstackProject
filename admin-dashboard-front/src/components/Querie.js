import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useParams, useHistory } from "react-router-dom";
import { Fab } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


import clientDatabaseServices from '../services/clientsDatabaseServises'


import ClientToDatabaseForm from './forms/clientToDatabase'

import {initializeAllNewQueries} from '../reducers/queriesReducer'
import {setNotification} from '../reducers/notificationsReducer'
import {createClient}  from '../reducers/clientsReducer'




const Querie = ({allNewQueries, clients}) => {
    const [querie, setQuerie] = useState(null)

    const dispatch = useDispatch()

    const type = "Save to the database"

    let history = useHistory()
    

    let omitedQuerie 

    let { id } = useParams();

   useEffect(()=>{
    Object.entries(allNewQueries).forEach((querieGroup)=>{querieGroup[1].filter((querie)=>{
        if(querie._id === id){
            setQuerie(querie)
        }})})
   },[])

   if(querie){
    const { __v, _id, type, ...rest} = querie
    omitedQuerie = rest
    }

   const saveQuerieToDatabase = async (values) => { 
    const existOrnot = clients.filter(client=> client.requiredInformation.name === values.requiredInformation.name || ( client.mainContact.name && client.mainContact.lastName && values.mainContact.lastName && client.mainContact.name === values.mainContact.name && client.mainContact.lastName === values.mainContact.lastName) )
        if(existOrnot.length > 0){
            const ok = window.confirm( existOrnot.length + ` client(s) with the same name and surname already exist. Do you still want to save it?`)
            if(ok){
                dispatch(setNotification("loading"))
                dispatch(createClient({...values, id: querie._id}))
                await  clientDatabaseServices.deleteQuerie(querie.type, querie._id).then((res)=>{
                  dispatch(setNotification(res))
                  dispatch(initializeAllNewQueries())
              })
                history.push("/new-queries")
            }   
        }else {
            dispatch(setNotification("loading"))
            dispatch(createClient({...values, id: querie._id}))
            clientDatabaseServices.deleteQuerie(querie.type, querie._id).then((res)=>{
                dispatch(setNotification(res))
                dispatch(initializeAllNewQueries())  
            })
            history.push("/new-queries")
        }
    }

    const deleteQuerie = async (type, id) => {
        const ok = window.confirm("Are you sure you want to delete this query?")
        if(ok){
                dispatch(setNotification("loading"))
            await  clientDatabaseServices.deleteQuerie(type, id).then((res)=>{
                dispatch(setNotification(res)) // sitas eis i notification reducery
                dispatch(initializeAllNewQueries())
                history.push("/new-queries")
            })
        }
    }

return (
    <div>
        {querie ? 
            <div>
            <div id="client-info">
                        <h1 className="title">{querie.name} <strong className="subtitle is-4" style={{"color":"black"}}> {querie.date.split("GMT")[0]} </strong> {querie.type} </h1>
                        <div id="client-info-buttons">
                            <a role="button" target="_blank" href={`https://www.dropbox.com/home/ToBeConfirmed/${id}`} id="client-component-button" >
                                <Fab>
                                    <img alt="dropbox" src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_m1.svg" style={{"maxHeight":"34px"}}></img>
                                </Fab>
                            </a>
                        </div>
                        <div style={{"padding": "10px"}}></div>
                        <div id="client-info-buttons">
                            <a role="button" onClick={()=>{deleteQuerie(querie.type, querie._id)}}>
                                <Fab>
                                    <DeleteForeverIcon style={{"color": "#ff000080"}} fontSize="large"/>
                                </Fab>
                            </a>
                        </div>
                </div>
                
                <div>
                    <div id="querie-div">
                        {Object.keys(omitedQuerie).map((key)=>{  // sumepina visa query
                                if(Array.isArray(querie[key])){
                                    return (
                                        <div id="shareholders" className="columns">
                                            {querie[key].map((element)=>{
                                                return(
                                                    <div >
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
                                        <div className="column">
                                            <p><strong>{key}</strong> : <a href={`https://www.dropbox.com/home/ToBeConfirmed/${id}`} target="_blank">{querie[key]}</a></p>
                                        </div>
                                    )
                                }
                                else {
                                    return(
                                        <div id="querie-info" className="column"> 
                                            <p><strong>{key.split(/(?=[A-Z])/).join(" ")}</strong> : {querie[key]}</p>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        : null }
        <div>
            {querie ? <ClientToDatabaseForm clients={clients} type={type} querie={querie} saveQuerieToDatabase={saveQuerieToDatabase}/> : <p>Querie not found </p>}
        </div>
    </div>
)

}



export default Querie
