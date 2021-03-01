import React, { useEffect, useState } from 'react'
import {Switch, Route, Link, useHistory ,useLocation } from "react-router-dom"
import './App.css';
import 'bulma/css/bulma.css'
import NavigationBar from './components/NavigationBar'
import NewQueries from "./components/NewQueries"
import Querie from './components/Querie'
import axios from 'axios'
import clientDatabaseServices from './services/clientsDatabase'

const  App = () => {
  const [allNewQueries , setAllNewQueries] = useState([])
  const [clients, setClients] = useState([])
    
  useEffect(()=>{
      axios.get("http://localhost:3001/api/new-queries").then((res)=>{     //<<<----- paskui pakeisti i api/new-queries tik! 
      setAllNewQueries(res.data)                                            // padaryt if else statementus jeigu nera tokeno tada i login page jei yra tokenas wiskas ok 
         })
         clientDatabaseServices.getAllClients().then((res)=>{
            setClients(res)
         })
    },[])


  return (
    <div className="App">
      <button onClick={()=>{console.log(clients)}}>clients</button>
      <NavigationBar>
        <Link to="/new-queries">New Queries</Link>
        <Link to="/clients">Clients</Link>
        <input className="input" placeholder="search..."></input>
      </NavigationBar>
      <Switch>
        <Route path="/new-queries" exact>
            <NewQueries allNewQueries={allNewQueries}/>
        </Route>
        <Route path="/clients" exact>
            <h1>klientaiXDDDD</h1>
        </Route>
        <Route path="/query/:id" exact>
            <Querie allNewQueries={allNewQueries}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

// 1) duom baze 
// 2) privacy policy
// 3) cokies 
// 4)googlo adds sudas 
// 5)
