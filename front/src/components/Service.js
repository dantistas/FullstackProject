import React, {useState} from 'react'
import {
    useParams
  } from "react-router-dom"


const Service = (props) => {
    const id = useParams().id
    
    if(id){
      const service = props.servicesDB.find(s=>s.service.split(" ").join("") === id)
      if(service){
        return(
            <div class="container">
              <h1 class="title py-6">{service.service}</h1>
              <h3 class="subtitle">{service.description}</h3>
              <h3 class="subtitle">If you wish to start or consult regarding this procedure please contact us via <br></br> phone: <a href="tel:+447450225137"><strong>+447450 225 137</strong></a> , email: <a href="mailto:info@mastis.co.uk"><strong>info@mastis.co.uk</strong></a> or trough contacts us <strong><a role="button" onClick={()=>{props.toggleVisibility()}} >form</a></strong> and you will receive further instructions after.</h3>
            </div>
      )
      }else{
        return (
          null
        )
      }
    }else{
      return(
        null
      )
    }  
}

export default Service