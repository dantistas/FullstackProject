import React, {useState} from 'react'
import {
    useParams
  } from "react-router-dom"
import MultiStepForm from './MultiStepForm'

const Service = (props) => {
  const [formPage, setFormPage] = useState(1)
    const id = useParams().id
    
    if(id){
      const service = props.servicesDB.find(s=>s.service.split(" ").join("") === id)
      if(service){
        return(
          <div>
            <div className="modal py-6" style={props.showWhenVisible}>
              <div className="modal-background"></div>
                <div className="container">
                  <p className="title">{service.service}</p>
                </div>
                <div className="container py-6 px-6">
                  <div className="modal-content py-6 " style={{"overflow":"hidden"}}>
                    <div className="columns is-vcentered is-centered">
                      <div className="column is-centered py-6 px-6">
                        <MultiStepForm formPage={formPage} setFormPage={setFormPage} subject={service.service}/>
                      </div>
                    </div>
                    <button onClick={()=>{props.toggleVisibility(); setFormPage(1)}} className="modal-close is-large" aria-label="close"></button>
                  </div>
                </div>
            </div>
            <div class="container">
              <h1 class="title">{service.service}</h1>
              <h3 class="subtitle">{service.description}</h3>
              <h3 class="subtitle">If you wish to start this procedure please fill in this simple 3 step <strong><a role="button" style={{"color": "lime"}} onClick={()=>{props.toggleVisibility()}} >form</a></strong>, you will receive an email with further instructions after.</h3>
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