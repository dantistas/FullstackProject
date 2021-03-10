import React, {useState} from 'react'



const Notification = (props) => {
    const [visible, setVisible] = useState(true)
    const [notification, setNotification]= useState("")

    const showWhenVisible = { display: visible ? 'block' : 'none' }

    return (
        <div className="modal py-6" style={showWhenVisible}>
            <div className="modal-background"></div>
                <div className="modal-content py-4 px-6">
                    <div id="notification">
                        <button onClick={()=>{setNotification("loading")}}>set loading</button>
                        {notification === 'loading' ? 
                            <div className="loader-wrapper" style={{"height":"110px", "width":"100%", "display":"flex","justifyContent":"center","alignItems":"center"}}>
                                <div className="loader is-loading" style={{"height":"100px", "width":"100px"}}></div>
                            </div> :
                        notification === "success" ? 
                            <div className="notification is-success" >
                                <button className="delete" onClick={()=>{setNotification("error")}}></button>
                                <p className="subtitle">testas</p>
                            </div> :
                        notification === "error" ? 
                            <div className="notification is-danger" style={{"width":"250px"}}>
                                <button className="delete" onClick={()=>{setNotification("success")}}></button>
                                <p className="subtitle">testas</p>
                            </div> :
                        null}
                    </div>
                </div>
            <button onClick={()=>{setVisible(!visible)}} className="modal-close is-large" aria-label="close"></button>
        </div>
    )

}


export default Notification