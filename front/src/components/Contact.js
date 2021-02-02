import React from 'react'
import MetaCreator from '../components/MetaCreator'
import { Fab } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import ChatIcon from '@material-ui/icons/Chat';


const Contact = (props) => {

        return (
            <div className="block">
                <MetaCreator title={props.title + " - Contact us" } description="Accounting, bookkepping services in London, UK."/>
                <div className="columns " style={{"width": "100%"}}>
                    <div className="column px-6">
                        <a href="mailto:info@mastis.co.uk">
                            <div style={{"opacity":"0.9","text-align":"center","backgroundColor":"silver","borderRadius":"10px","padding":"10px"}}>
                                <Fab>
                                    <EmailIcon color="primary" fontSize="large"/>
                                </Fab>
                                <p><strong style={{"color":"black"}}>info@mastis.co.uk</strong></p>
                            </div>
                        </a>
                    </div>
                    <div className="column px-6">
                        <a href="tel:+447450225137">
                            <div style={{"opacity":"0.9","text-align":"center","backgroundColor":"silver","borderRadius":"10px","padding":"10px"}}>
                                    <Fab>
                                        <CallIcon color="primary" fontSize="large"/>
                                    </Fab>
                                    <p><strong style={{"color":"black"}}>07498 226576</strong></p>
                            </div>
                        </a>
                    </div>
                    <div className="column px-6">
                        <a type="button" onClick={()=>{props.toggleVisibility()}}>
                            <div  style={{"opacity":"0.9","text-align":"center","backgroundColor":"silver","borderRadius":"10px","padding":"10px"}}>
                                <Fab>
                                    <ChatIcon color="primary" fontSize="large" onClick={()=>{props.toggleVisibility()}}/>
                                </Fab>
                                <p><strong style={{"color":"black"}}>Contact us form</strong></p>               
                            </div>
                        </a>  
                    </div>
                </div>
            </div> 
          ) 
}

export default Contact