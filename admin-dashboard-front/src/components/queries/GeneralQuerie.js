import React, { useEffect, useState } from 'react'
import GeneralQuerieForm from '../forms/GeneralQuerieForm'



const GeneralQuerie = ({querie}) => {


return (
        <div >
            <h1>general querie</h1>
            <GeneralQuerieForm querie={querie}/>
        </div>
    )

}



export default GeneralQuerie