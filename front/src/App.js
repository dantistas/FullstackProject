import React, { useEffect, useState } from 'react'
import Service from './components/Service'
import Home from './components/Home'
import Contact from './components/Contact'
import ContactUsForm from './components/ContactUsForm'
import FloatingButtonContent from './components/FloatingButtonContent'
import { Fab } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import bg from './bg.jpg'
import mastislogo from './mastislogo.png'
import quickbooks from "./icons/quickbooks.webp"
import sage50 from "./icons/sage50.png"
import vtSoftware from "./icons/VT.png"
import './App.css'                      //<<<---- dabar gali keisti css xD
import 'bulma/css/bulma.css'
import {
   //<<----- BrowserRouter pakeistas i HashRouter
  Switch, Route, Link, useHistory ,useLocation  //<--- kadangi usehistory neveike, permesi router i index.js!!!
} from "react-router-dom"
import axios from 'axios'



const App = () => {
  const [subject, setSubject]= useState("General")
  const [notification, setNotification] = useState(null)
  const [servicesDB, setServicesDB] = useState([])
  const [visible, setVisible] = useState(false)
  
  const title = "Mastis"
  let location = useLocation()
  console.log(location.pathname)

  const showWhenVisible = { display: visible ? 'block' : 'none' }



  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useEffect(()=>{
   
    axios.get("http://localhost:3001/api/services").then((res)=>{     //<<<----- paskui pakeisti i api/services tik!
         setServicesDB(res.data)
       })

  },[])


  const inform = (message) => {
      setNotification(message)
      setTimeout(function(){ setNotification(null); }, 3000)
      console.log("pasikeite")
  }

  return ( 
    <div>
      <div className="hero is-fullheight is-dark has-background">
        <img alt="Background" className="hero-background is-transparent" src={bg} />
        <div class="hero-head">
            <nav role="navigation" aria-label="main navigation" className="navbar is-dark is-transparent" id="nav">
              <div className="navbar-brand">
                <a className="navbar-item" href="/">
                  <img alt="" src={mastislogo}/>
                </a>
                <a role="button" onClick={()=>{document.querySelector("#navbar-links").classList.toggle('is-active')}} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>
              <div class="navbar-menu" id="navbar-links">
                <div class="navbar-start">
                  <Link class="navbar-item" to="/" onClick={()=>{document.querySelector("#navbar-links").classList.toggle('is-active')}}>Home</Link>
                  <div className="navbar-item">
                    <div className="dropdown is-hoverable">
                      <div className="dropdown-trigger">
                        <a className="navbar-link" aria-haspopup="true" aria-controls="dropdown-menu4">Services</a>
                      </div>
                      <div className="dropdown-menu" id="dropdown-menu4" role="menu" style={{"backgroundColor":"grey"}}>
                        {servicesDB.map((service)=>{return <Link role="button" to={`/services/${service.service.split(" ").join("")}`} onClick={()=>{setSubject(service.service); document.querySelector("#navbar-links").classList.toggle('is-active')}} key={service.service} class="navbar-item">{service.service}</Link>})}
                      </div>
                    </div>
                  </div>
                  <a className="navbar-item" href='https://www.employedandselfemployed.co.uk/tax-calculator'>Calculator</a>
                </div>
                <div class="navbar-end">
                  <Link role="button" dissabled class="navbar-item" to="/contact" onClick={()=>{document.querySelector("#navbar-links").classList.toggle('is-active')}} >Contact us</Link>
                </div>
              </div>
            </nav>
        </div>
        <div class="hero-body">
          <div class="container is-fluid py-6">
            <Switch>
              <Route path="/services/:id">
                <Service title={title} servicesDB={servicesDB} setVisible={setVisible} visible={visible} showWhenVisible={showWhenVisible} toggleVisibility={toggleVisibility}/>
              </Route>
              <Route path="/contact">
                <Contact title={title} toggleVisibility={toggleVisibility} inform={inform} subject={subject}/>
              </Route>
              <Route path="/" exact>
                <Home Link={Link} title={title}/>
              </Route>
            </Switch>
            <FloatingButtonContent location={location.pathname} showWhenVisible={showWhenVisible} toggleVisibility={toggleVisibility}/>
          </div>
        </div>
      </div>
      <div id="footer-div">
              <div style={{"paddingTop":"30px"}}>
                <img src={sage50} id="icon"></img>
                <img src={quickbooks} id="icon"></img>
                <img src={vtSoftware} id="icon"></img>
              </div>
              <div id="whatsapp-us-fab">
                <a role="button" target="_blank" href="https://wa.me/447498226576">
                    <Fab size="small" >
                      <WhatsAppIcon fontSize="small" style={{"color":"green"}}/>
                    </Fab>
                  </a>
              </div>
              <div id="email-us-fab">
                <a role="button" href="mailto:info@mastis.co.uk">
                    <Fab size="small">
                      <EmailIcon fontSize="small" color="primary"/>
                    </Fab>
                  </a>
              </div>
              <div id="Call-us-fab">
                <a role="button" href="tel:+447498226576">
                    <Fab size="small">
                      <CallIcon fontSize="small" color="primary"/>
                    </Fab>
                  </a>
              </div>
              <div id="contact-us-fab">
                <a role="button" onClick={()=>{toggleVisibility()}}>
                  <Fab aria-label="contact-us">
                      <ChatOutlinedIcon/>
                  </Fab>
                </a>
              </div >
      </div>
    </div>
  )
}

export default App


// pasiziureti kaip padaryti su burgeriu kad uzmestu ant topo o nenuleidintu visa /// fixed
// tada padaryti contactu forma multistep ir jinai turi atsidaryti su overlay viskas yra ready.set.blog // fixed
//todo
// pakeisti fokes tieks kiekvienu service// todo
// irasyti dotenv


//padaryti kad kiekvienas requestas siustu i backende