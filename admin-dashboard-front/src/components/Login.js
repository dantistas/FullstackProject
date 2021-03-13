import React, { useState, useEffect } from 'react'
import {Switch, Route, Link, useHistory ,useLocation } from "react-router-dom"
import loginServices from '../services/loginServices'
import axios from 'axios'



const Login = ({dispatch, setUser, setNotification, user}) => {
    const [name, setName] = useState(null)
    const [password, setPassword] = useState(null)
    let history = useHistory()

    useEffect(()=>{
        if(user){
            history.push('/')
        }
    })

    const login = async (e) => {
        const user = {
            name: name,
            password: password
        }
        e.preventDefault()
        setName("")
        setPassword("")
        // axios.post('http://localhost:3001/create-user', user).then((res)=>{
        //     console.log(res)
        // })
        const loggedInUser = await loginServices.login(user)
        if(loggedInUser.error){
            dispatch(setNotification(loggedInUser))
        }else{
            window.localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))
            dispatch(setUser(loggedInUser))
        }
    }

return (
    <div>
        <form onSubmit={login}>
            <input type="password" value={name} onChange={({ target }) => setName(target.value)}></input>
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
            <div className="field">
            </div>
            <button className="button is-success" type="submit" disabled={!name || !password}>Log in</button>
        </form>
    </div>
)

}



export default Login