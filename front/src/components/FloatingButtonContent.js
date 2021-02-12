import React from 'react'
import ContactUsForm from './ContactUsForm'



const FloatingButtonContent = (props) => {

    return (
        <div className="modal py-6" style={props.location === "/webchat" ? {"display":"block"} : props.showWhenVisible}>
            <div className="modal-background"></div>
            <ContactUsForm language={props.language} location={props.location} toggleVisibility={props.toggleVisibility}/>
        </div>
    )

}


export default FloatingButtonContent