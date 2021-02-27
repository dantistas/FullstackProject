import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

const NewQueries = ({allNewQueries}) => {
    const [queries, setQueries] = useState([])
    let history = useHistory()

return (
    <div>
        <div>
            <button onClick={()=>{setQueries(allNewQueries.generalQueries)}}>General queries ({allNewQueries.generalQueries.length})</button>
            <button onClick={()=>{setQueries(allNewQueries.companyMattersQueries)}}>Company matters queries ({allNewQueries.companyMattersQueries.length})</button>
            <button onClick={()=>{setQueries(allNewQueries.newCompanyEstablishmentQueries)}}>New company establish queries ({allNewQueries.newCompanyEstablishmentQueries.length})</button>
            <button onClick={()=>{setQueries(allNewQueries.selfEmployedQueries)}}>Self employed queries ({allNewQueries.selfEmployedQueries.length})</button>
        </div>
        <div>
            {queries.map((querie)=>(
                <div style={{"border": "solid"}}>
                    <button onClick={()=>{history.push(`/query/${querie._id}`)}}>view</button>
                    <p><strong>{querie.name}</strong> | {querie.date}</p>
                </div>
            ))}
        </div>
    </div>
)

}



export default NewQueries