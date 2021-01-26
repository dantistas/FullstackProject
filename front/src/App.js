import React, { useEffect, useState } from 'react'
import { Fab } from '@material-ui/core';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import Service from './components/Service'
import Home from './components/Home'
import Contact from './components/Contact'
import ContactUsForm from './components/ContactUsForm'
import bg from './bg.jpg'
import mastislogo from './mastislogo.png'
import './App.css'                      //<<<---- dabar gali keisti css xD
import 'bulma/css/bulma.css'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useHistory , //<--- kadangi usehistory neveike, permesi router i index.js!!!
} from "react-router-dom"
import axios from 'axios'



const App = () => {
  const [subject, setSubject]= useState("General")
  const [notification, setNotification] = useState(null)
  const [servicesDB, setServicesDB] = useState([])
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? 'block' : 'none' }

  let history = useHistory();

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
    <Router>
      <div class="hero is-fullheight is-dark has-background">
        <img alt="Background" class="hero-background is-transparent" src={bg} />
        <div class="hero-head">
            <nav role="navigation" aria-label="main navigation" class="navbar is-dark is-transparent" id="nav">
              <div class="navbar-brand">
                <a class="navbar-item" href="/">
                  <img alt="" src={mastislogo}/>
                </a>
                <a role="button" onClick={()=>{document.querySelector("#navbar-links").classList.toggle('is-active')}} class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
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
                  {/* <Link class="navbar-item" to="/calculator">Calculator</Link> */}
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
              {/* <Route path='/calculator'
                    component={() => { 
                      window.location.href = 'https://www.employedandselfemployed.co.uk/tax-calculator'; 
                      return null;
                      }}>
              </Route> */}
              <Route path="/services/:id">
                <Service servicesDB={servicesDB} setVisible={setVisible} visible={visible} showWhenVisible={showWhenVisible} toggleVisibility={toggleVisibility}/>
              </Route>
              <Route path="/contact">
                <Contact inform={inform} subject={subject}/>
              </Route>
              <Route path="/">
                <Home Link={Link}/>
              </Route>
            </Switch>
            <ContactUsForm showWhenVisible={showWhenVisible} toggleVisibility={toggleVisibility}/>
          </div>
        </div>
      </div>
      <div id="contact-us-fab">
          <Fab aria-label="contact-us">
              <ChatOutlinedIcon onClick={()=>{toggleVisibility()}}/>
          </Fab>
      </div>
    </Router>
  )
}

export default App


// pasiziureti kaip padaryti su burgeriu kad uzmestu ant topo o nenuleidintu visa /// fixed
// tada padaryti contactu forma multistep ir jinai turi atsidaryti su overlay viskas yra ready.set.blog // fixed
//todo
// pakeisti fokes tieks kiekvienu service// todo
// irasyti dotenv