import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { Fab } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClientToDatabaseForm from './forms/clientToDatabase'
import clientsDatabaseServices from '../services/clientsDatabaseServises'

const Client = ({clients, dispatch, initializeClients, deleteClientWithID, setNotification }) => {
    const [client, setClient] = useState(null)
    const type = "Overwrite"
    let history = useHistory()
    const {id} = useParams()

    useEffect(()=>{
        setClient(null)
        const clientToState = clients.find((client)=>{
            return client._id === id
        })
        setClient(clientToState)
    },[id])

    const overwrite = async (values) => {
        const ok = window.confirm("Are you sure you want to overwrite?" )
        if(ok){
            dispatch(setNotification('loading'))
            await clientsDatabaseServices.updatedClient(client._id,values).then((res)=>{
                dispatch(setNotification(res.notification))
                dispatch(initializeClients())
            })
            history.push('/clients')
        }
    }

    const deleteClient = (clientID) => {
        const ok = window.confirm(`Are you sure you want to delete ${client.requiredInformation.name}?`)
        if(ok){
            dispatch(setNotification('loading'))
            dispatch(deleteClientWithID(clientID))
            history.push('/clients')
        }
    }

return (
    <div >
        <div>
            {client ? 
                <div id="client-info">
                    <h1 className="title">{client.requiredInformation.name }<strong className="subtitle is-4" style={{"color":"black"}}> {client.requiredInformation.clientType}</strong></h1>
                    <div id="client-info-buttons">
                        <a role="button" target="_blank" href={`https://www.dropbox.com/home/Clients/${id}`} id="client-component-button" >
                            <Fab>
                                <img alt="dropbox" src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_m1.svg" style={{"maxHeight":"34px"}}></img>
                            </Fab>
                        </a>
                    </div>
                    <div style={{"padding": "10px"}}></div>
                    <div id="client-info-buttons">
                        <a role="button" onClick={()=>{deleteClient(client._id)}}>
                            <Fab>
                                <DeleteForeverIcon style={{"color": "#ff000080"}} fontSize="large"/>
                            </Fab>
                        </a>
                    </div>
                </div>
            : <p>client not found</p>}
        </div>
       {client ? <ClientToDatabaseForm overwrite={overwrite} type={type} client={client}/> : <p>client not found</p> }
        
    </div>
)

}



export default Client
