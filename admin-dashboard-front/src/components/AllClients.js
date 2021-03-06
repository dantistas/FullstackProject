import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

const AllClients = ({clients}) => {
    let history = useHistory()

return (
    <div >
       {clients.length === 0 ? <p>No clients to show, press add new client to create.</p> : clients.map((client)=>{
           return (
            <div>
                <p><strong>{client.requiredInformation.name} | {client.requiredInformation.clientType}</strong> <button onClick={()=>{history.push(`/client/${client._id}`)}}>view</button></p>
            </div>
           )
       })}
    </div>
)

}



export default AllClients