import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

const NewQueries = ({allNewQueries}) => {
    const [queries, setQueries] = useState([])
    const [querieType, setQuerieType] = useState("")
    let history = useHistory()


    const buttonGeneralQueries = querieType === "generalQueries"  ?  "button is-success is-inverted" : "button is-success"
    const buttonCompanyMattersQueries = querieType === "companyMattersQueries"  ?  "button is-success is-inverted" : "button is-success"
    const buttonNewCompanyEstablishmentQueries = querieType === "newCompanyEstablishmentQueries"  ?  "button is-success is-inverted" : "button is-success"
    const buttonSelfEmployedQueries = querieType === "selfEmployedQueries"  ?  "button is-success is-inverted" : "button is-success"

    const pressButton = (buttonType) => {

        if(querieType === buttonType){
            setQuerieType("")
            setQueries([])
        }else{setQuerieType(buttonType)}

    }

return (
    <div id="all-queries-div">
        <div id="all-queries-buttons">
            <button className={buttonGeneralQueries} onClick={()=>{setQueries(allNewQueries.generalQueries); pressButton('generalQueries')}}>General queries ({allNewQueries.generalQueries.length})</button>
            <button className={buttonCompanyMattersQueries} onClick={()=>{setQueries(allNewQueries.companyMattersQueries); pressButton('companyMattersQueries')}}>Company matters queries ({allNewQueries.companyMattersQueries.length})</button>
            <button className={buttonNewCompanyEstablishmentQueries} onClick={()=>{setQueries(allNewQueries.newCompanyEstablishmentQueries); pressButton('newCompanyEstablishmentQueries')}}>New company establish queries ({allNewQueries.newCompanyEstablishmentQueries.length}) </button>
            <button className={buttonSelfEmployedQueries} onClick={()=>{setQueries(allNewQueries.selfEmployedQueries);pressButton('selfEmployedQueries')}}>Self employed queries ({allNewQueries.selfEmployedQueries.length})</button>
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