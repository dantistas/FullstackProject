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
              <MetaCreator title={props.title + " | " + service.service} description={props.language === "en" ? service.SEO.en : props.language === "lt" ? service.SEO.lt : null}/>
              <div className="container" style={{"padding":"20px"}}>
                <h1 class="title py-6">{props.language === "en" ? service.service : props.language === "lt" ? service.paslauga : null }</h1>
              </div>
              <div className="container" style={{"opacity":"0.9","backgroundColor":"grey","borderRadius":"10px","padding":"20px"}}>
                <h3 class="subtitle">{props.language === "en" ? service.description : props.language ==="lt" ? service.aprasymas : null}</h3>
              </div>
            </div>
      )
      }else{
        return (
          <h1 className="title">{props.language=== "en" ? "404 Page not found" : props.language === "lt" ? "404 puslapis nerastas" : null}</h1>
        )
      }
    }else{
      return(
        null
      )
    }  
}

export default Service