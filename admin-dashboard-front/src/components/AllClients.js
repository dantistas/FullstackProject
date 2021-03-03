import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

const AllClients = ({clients}) => {
    let history = useHistory()

return (
    <div >
       {clients.map((client)=>{
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