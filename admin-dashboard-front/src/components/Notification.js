import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setNotification} from '../reducers/notificationsReducer'



const Notification = () => {
    const notification = useSelector(state => state.notifications)

    const showWhenVisible = { display: notification ? 'block' : 'none' }

    const dispatch = useDispatch()


    return (
        <div className="modal py-6" style={showWhenVisible}>
            <div className="modal-background"></div>
                <div className="modal-content py-4 px-6">
                    <div id="notification">
                        {notification === 'loading' ? 
                            <div className="loader-wrapper" style={{"height":"110px", "width":"100%", "display":"flex","justifyContent":"center","alignItems":"center"}}>
                                <div className="loader is-loading" style={{"height":"100px", "width":"100px"}}></div>
                            </div> :
                        typeof notification === "object" && notification !== null && notification.hasOwnProperty('success') ?
                            <div className="notification is-success" >
                                <p className="subtitle">{notification.success}</p>
                            </div> :
                        typeof notification === "object" && notification !== null && notification.hasOwnProperty('error') ? 
                            <div className="notification is-danger">
                                <p className="subtitle">{notification.error}</p>
                            </div> :
                        notification ? 
                            <div className="notification is-dark">
                                <p className="subtitle">{notification}</p>
                            </div>
                        :null}
                    </div>
                </div>
            <button onClick={()=>{dispatch(setNotification(null))}} className="modal-close is-large" aria-label="close"></button>
        </div>
    )

}


export default Notification