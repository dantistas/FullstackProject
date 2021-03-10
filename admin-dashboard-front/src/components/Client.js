import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { Fab } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClientToDatabaseForm from './forms/clientToDatabase'
import clientsDatabaseServices from '../services/clientsDatabaseServises'

const Client = ({clients}) => {
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

    const overwrite = (values) => {
        const ok = window.confirm("Are you sure you want to overwrite?" )
        if(ok){
            clientsDatabaseServices.updatedClient(client._id,values)
            history.push('/clients')
            //ideti returna is serviso i notificasionus
        }
    }

    const deleteClient = (clientID) => {
        const ok = window.confirm(`Are you sure you want to delete ${client.requiredInformation.name}?`)
        if(ok){
            clientsDatabaseServices.deleteClient(clientID)
            history.push('/clients')
            //ideti returna is serviso i notificasionus
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
        
        {/* <div id="to-dropbox-folder">
            <a className="button" as="button" target="_blank" href={`https://www.dropbox.com/home/Clients/${id}`} id="client-component-button">
                <img alt="dropbox" src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_m1.svg" style={{"maxHeight":"34px", "paddingLeft": "10px"}}></img>
                <img alt="dropbox" src="https://cfl.dropboxstatic.com/static/images/logo_catalog/wordmark--dropbox_m1.svg" style={{"maxHeight":"34px", "paddingLeft": "10px"}}></img>
            </a>
            <a id="client-component-button" className="button">swx</a>
        </div> */}
       {client ? <ClientToDatabaseForm overwrite={overwrite} type={type} client={client}/> : <p>client not found</p> }
        
    </div>
)

}



export default Client



// 1)perkelti visus kodus i .env, <<------- done
// 2) padaryti searcha ir patikrinti ar nesidubliouje klientu acc
// 3)pradeti vystyti front enda
// 4) sujungineti servisus su atitinkamais sudais
// 5) ideti commentarus <<--- beveik done
// 6) ideti upload mygtuka pagal id
