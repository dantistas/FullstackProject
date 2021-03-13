import React, { useEffect, useState } from 'react'
import {Switch, Route, Link, useHistory ,useLocation } from "react-router-dom"
import logo from '../icons/mastisLogo.png'


const NavigationBar = ({clients, dispatch, setUser, user}) => {
    const [searchResults, setSearchResults] = useState([])
    let history = useHistory()

    const searchClient = (e) => {
        const value = e.target.value
        if(value){
            const results = clients.filter((client)=>{
                return client.requiredInformation.name.toLowerCase().includes(value.toLowerCase())
            })
            if(results.length < 5){
                setSearchResults(results)
            }
        }else{
            setSearchResults([])
        }
    }

    const clearSearch = () => {
        setSearchResults([]);
        document.getElementById('client-search-input').value=""
    }


    const logOut = () => {
        window.localStorage.clear()
        dispatch(setUser(null))
        history.push('/login')
        window.location.reload()    
      }

return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a className="navbar-item" href="/">
                <img alt="" src={logo}></img>
            </a>
            <div className="navbar-item">
                <input id="client-search-input" className="input" placeholder="search client..." onChange={searchClient}></input>
            </div>
            <div className="navbar-item">
                <button className="button is-success" disabled={!user} onClick={()=>{history.push('/add-new-client')}}>+</button>
            </div>
            {user ?
                <div className="navbar-item">
                    <button onClick={logOut} className="button is-danger">Log out</button>
                </div>
                : null}
            <a role="button" onClick={()=>{document.querySelector("#navbar-links").classList.toggle('is-active')}} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
            </a>
        </div>
        <div className="navbar-menu" id="navbar-links">
            <div className="navbar-end">
                <div className="navbar-item">
                    <Link as="button" to="/new-queries" onClick={()=>{document.querySelector("#navbar-links").classList.toggle('is-active')}}>New Queries</Link>
                </div>
                <div className="navbar-item">
                    <Link to="/clients" onClick={()=>{document.querySelector("#navbar-links").classList.toggle('is-active')}}>Clients</Link>
                </div>
            </div>
        </div>
        {searchResults.length > 0 ? 
        <div id="client-search-results">
            <ul>
                {searchResults.map((result)=>{
                    return(
                        <div>
                            <Link as="button" to={`/client/${result._id}`} onClick={clearSearch} style={{"color":"black"}}>{result.requiredInformation.name} {result.requiredInformation.clienType ?  ` | ${result.requiredInformation.clienType}` : null}</Link>
                        </div>
                    )
                })}
            </ul>
        </div>
        : null }
    </nav>
    )
}



export default NavigationBar