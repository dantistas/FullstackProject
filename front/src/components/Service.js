import React from 'react'
import {
    useParams
  } from "react-router-dom"
import MetaCreator from '../components/MetaCreator'


const Service = (props) => {
    const id = useParams().id
    
    if(id){
      const service = props.servicesDB.find(s=>s.service.split(" ").join("") === id)
      if(service){
        return(
            <div>
              <MetaCreator title={props.title + " - " + service.service} description={service.description}/>
              <div className="container" style={{"padding":"20px"}}>
                <h1 class="title py-6">{service.service}</h1>
              </div>
              <div className="container" style={{"opacity":"0.9","backgroundColor":"grey","borderRadius":"10px","padding":"20px"}}>
                <h3 class="subtitle">{service.description}</h3>
              </div>
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