import React, { useEffect, useState } from 'react'
import { useHistory, Link } from "react-router-dom";

const AllClients = ({clients}) => {
    let history = useHistory()

return (
    <div>
       {clients.length === 0 ? <p>No clients to show, press add new client to create.</p> : clients.map((client)=>{
           return (
            <div>
                <a role="button" onClick={()=>{history.push(`/client/${client._id}`)}} style={{"color":"black"}} className="subtitle is-4"><strong className="title is-4">{client.requiredInformation.name} | </strong> {client.requiredInformation.clientType}</a>
                <div style={{"paddingTop":"5px"}}></div>
            </div>
           )
       })}
    </div>
)

}



export default AllClients