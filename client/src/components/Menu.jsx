import React from 'react'
import { NavLink } from 'react-router-dom'

export const Menu = () => {
    return (
        <>
            <div className="dropdown-menu" aria-labelledby="triggerId">
                <NavLink to={'/'} className='dropdown-item'>Home</NavLink>
                <NavLink to={'/countdown'} className='dropdown-item'>Saved countdowns</NavLink>
                <div className="dropdown-divider"></div>
                <NavLink to={'/settings'} className='dropdown-item' end>Settings</NavLink>
            </div>
        </>
    )
}
