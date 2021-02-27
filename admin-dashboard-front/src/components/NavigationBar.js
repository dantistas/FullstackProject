import React, { useEffect, useState } from 'react'



const NavigationBar = (props) => {


return (
    <nav className="navbar">
        <ul className="navbar-nav">
            {props.children}
        </ul>
    </nav>
    )

}



export default NavigationBar