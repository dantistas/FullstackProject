import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import ClientToDatabaseForm from './forms/clientToDatabase'
import clientsDatabaseServices from '../services/clientsDatabaseServises'

const Client = ({clients}) => {
    const [client, setClient] = useState(null)
    const type = "Overwrite"
    let history = useHistory()
    const {id} = useParams()

    useEffect(()=>{
        clients.filter(async (c) => {
            if(c._id === id){
              await  setClient(c)
            }
        } )
    },[])

    const overwrite = (values) => {
        const ok = window.confirm("are you sure you want to overwrite?" )
        if(ok){
            clientsDatabaseServices.updatedClient(client._id,values)
            history.push('/clients')
            //ideti returna is serviso i notificasionus
        }
    }

return (
    <div >
       {id} <button onClick={()=>{console.log(client)}}>client</button>
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
