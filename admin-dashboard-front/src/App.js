import React, { useEffect, useState } from 'react'
import {Switch, Route, Link, useHistory ,useLocation } from "react-router-dom"
import './App.css';
import 'bulma/css/bulma.css'
import NavigationBar from './components/NavigationBar'
import Notification from './components/Notification'
import NewQueries from "./components/NewQueries"
import Querie from './components/Querie'
import Clients from './components/AllClients'
import Client from './components/Client'
import ClientToDatabaseForm from './components/forms/clientToDatabase'
import clientsDatabaseServises from './services/clientsDatabaseServises';
import bg from './icons/bg.jpg'

const  App = () => {
  const [allNewQueries , setAllNewQueries] = useState([])
  const [clients, setClients] = useState([])

  let history = useHistory()
    
  useEffect(()=>{
      clientsDatabaseServises.getAllNewQueries().then((res)=>{     //<<<----- paskui pakeisti i api/new-queries tik! 
        setAllNewQueries(res)                                          // padaryt if else statementus jeigu nera tokeno tada i login page jei yra tokenas wiskas ok 
         })
         clientsDatabaseServises.getAllClients().then((res)=>{
            setClients(res)
         })
    },[])


  return (
    <div className="App">
      <div className="hero is-fullheight is-dark has-background">
        <img alt="Background" className="hero-background is-transparent" src={bg} />
        <div className="hero-head">
          <NavigationBar clients={clients}>
            {/* <Link as="button" to="/new-queries">New Queries</Link>
            <Link to="/clients">Clients</Link>
            <input className="input" placeholder="search..."></input>
            <button className="button is-success" onClick={()=>{history.push('/add-new-client')}}>+ Add new client</button> */}
          </NavigationBar>
        </div>
        <div className="hero-body">
          <Notification/>
          <div className="container">
            <Switch>
              <Route path="/new-queries" exact>
                  <NewQueries allNewQueries={allNewQueries}/>
              </Route>
              <Route path="/clients" exact>
                  <Clients clients={clients}/>
              </Route>
              <Route path="/query/:id" exact>
                  <Querie clients={clients} allNewQueries={allNewQueries}/>
              </Route>
              <Route path="/client/:id" exact>
                  <Client clients={clients}/>
              </Route>
              <Route path="/add-new-client" exact>
                  <h1 className="title">Add new client</h1>
                  <ClientToDatabaseForm type="Add new client"/>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// 1) duom baze 
// 2) privacy policy
// 3) cokies 
// 4)googlo adds sudas 
// 5)
