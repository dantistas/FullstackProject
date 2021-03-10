import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

const NewQueries = ({allNewQueries}) => {
    const [queries, setQueries] = useState([])
    const [querieType, setQuerieType] = useState("")
    let history = useHistory()


    const buttonGeneralQueries = querieType === "general queries"  ?  "button is-primary is-inverted" : "button is-primary"
    console.log(queries)


return (
    <div id="all-queries-div">
        <div id="all-queries-buttons">
            <button className={buttonGeneralQueries} onClick={()=>{setQueries(allNewQueries.generalQueries)}}>General queries ({allNewQueries.generalQueries.length})</button>
            <button className="button is-primary" onClick={()=>{setQueries(allNewQueries.companyMattersQueries)}}>Company matters queries ({allNewQueries.companyMattersQueries.length})</button>
            <button className="button is-primary" onClick={()=>{setQueries(allNewQueries.newCompanyEstablishmentQueries)}}>New company establish queries ({allNewQueries.newCompanyEstablishmentQueries.length})</button>
            <button className="button is-primary" onClick={()=>{setQueries(allNewQueries.selfEmployedQueries)}}>Self employed queries ({allNewQueries.selfEmployedQueries.length})</button>
        </div>
        <div>
            {queries.map((querie)=>(
                <div>
                    <a className="subtitle is-4" style={{"color":"black"}} role="button" onClick={()=>{history.push(`/query/${querie._id}`)}}><strong className="title is-4">{querie.name}</strong> |{querie.date}</a>
                </div>
            ))}
        </div>
    </div>
)

}



export default NewQueries