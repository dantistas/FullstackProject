import React, { useEffect, useState } from 'react'
import Querie from './Querie'


const NewQueries = ({allNewQueries}) => {
    const [queries, setQueries] = useState([])

return (
    <div>
        <div>
            <button onClick={()=>{setQueries(allNewQueries.generalQueries)}}>General queries ({allNewQueries.generalQueries.length})</button>
            <button onClick={()=>{setQueries(allNewQueries.companyMattersQueries)}}>Company matters queries ({allNewQueries.companyMattersQueries.length})</button>
            <button onClick={()=>{setQueries(allNewQueries.newCompanyEstablishmentQueries)}}>New company establish queries ({allNewQueries.newCompanyEstablishmentQueries.length})</button>
            <button onClick={()=>{setQueries(allNewQueries.selfEmployedQueries)}}>Self employed queries ({allNewQueries.selfEmployedQueries.length})</button>
        </div>
        <div>
            {queries.map((querie)=>(<Querie key={queries.indexOf(querie)} querie={querie}/>))}
        </div>
    </div>
)

}



export default NewQueries