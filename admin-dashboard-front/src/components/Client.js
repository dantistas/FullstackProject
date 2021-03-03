import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import ClientToDatabaseForm from './forms/clientToDatabase'

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

return (
    <div >
       {id} <button onClick={()=>{console.log(client)}}>client</button>
       {client ? <ClientToDatabaseForm type={type} client={client} clients={clients}/> : <p>client not found</p> }
        
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
