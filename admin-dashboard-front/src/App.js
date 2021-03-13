import React, { useEffect, useState } from 'react'
import {Switch, Route, Link, useHistory ,useLocation } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'

import {initializeAllNewQueries} from './reducers/queriesReducer'
import {initializeClients, createClient, deleteClientWithID} from './reducers/clientsReducer'
import {setNotification} from './reducers/notificationsReducer'
import {setUser} from './reducers/loginReducer'

import './App.css';
import 'bulma/css/bulma.css'
import NavigationBar from './components/NavigationBar'
import Notification from './components/Notification'
import NewQueries from "./components/NewQueries"
import Querie from './components/Querie'
import Clients from './components/AllClients'
import Client from './components/Client'
import ClientToDatabaseForm from './components/forms/clientToDatabase'
import Login from './components/Login'
import bg from './icons/bg.jpg'

const  App = () => {
  const allNewQueries = useSelector(state => state.allQueries )
  const clients = useSelector(state => state.clients )
  const user = useSelector(state=>state.user)

  const dispatch = useDispatch()

  let history = useHistory()

  const loggedUserJson = window.localStorage.getItem('loggedUser')
  console.log(loggedUserJson)
    
  useEffect(()=>{
      if(user){
        dispatch(initializeAllNewQueries())    //<<<----- paskui pakeisti i api/new-queries tik! 
        dispatch(initializeClients())                                          // padaryt if else statementus jeigu nera tokeno tada i login page jei yra tokenas wiskas ok 
      }else if(loggedUserJson){
        const loggedUser = JSON.parse(loggedUserJson)
        dispatch(setUser(loggedUser))
      } else {
        history.push('/login')
      }
      },[user])

  return (
    <div className="App">
      <div className="hero is-fullheight is-dark has-background">
        <img alt="Background" className="hero-background is-transparent" src={bg} />
        <div className="hero-head">
          <NavigationBar clients={clients} dispatch={dispatch} setUser={setUser} user={user}/>
        </div>
        <div className="hero-body">
          <Notification dispatch={dispatch}/>
          <div className="container">
            <Switch>
              <Route path="/" exact>
                {user ? 
                  <h1 className="title">Laba diena {user.name}</h1>
                :null} 
              </Route>
              <Route path="/new-queries" exact>
                  <NewQueries allNewQueries={allNewQueries}/>
              </Route>
              <Route path="/login" exact>
                <Login dispatch={dispatch} setUser={setUser} setNotification={setNotification} user={user}/>
              </Route>
              <Route path="/clients" exact>
                  <Clients clients={clients}/>
              </Route>
              <Route path="/query/:id" exact>
                  <Querie clients={clients} allNewQueries={allNewQueries}/>
              </Route>
              <Route path="/client/:id" exact>
                  <Client clients={clients} dispatch={dispatch} initializeClients={initializeClients} deleteClientWithID={deleteClientWithID} setNotification={setNotification}/>
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
