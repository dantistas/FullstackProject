import React, { useEffect, useState } from 'react'
import {Switch, Route, Link, useHistory ,useLocation } from "react-router-dom"
import './App.css';
import 'bulma/css/bulma.css'
import NewQueries from "./components/NewQueries"
import axios from 'axios'

const  App = () => {
  const [allNewQueries , setAllNewQueries] = useState([])
    
  useEffect(()=>{
      axios.get("http://localhost:3001/api/new-queries").then((res)=>{     //<<<----- paskui pakeisti i api/new-queries tik!
      setAllNewQueries(res.data)
         })
  
    },[])

  return (
    <div className="App">
      <Link to="/new-queries">New Queries</Link>
      <Link to="/clients">Clients</Link>
      <Switch>
        <Route path="/new-queries" exact>
            <NewQueries allNewQueries={allNewQueries}/>
        </Route>
        <Route path="/clients" exact>
            <h1>klientaiXDDDD</h1>
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
