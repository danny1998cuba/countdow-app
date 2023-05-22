import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context'

export const Menu = () => {
    const {
        logged, handleLogout, user
    } = useContext(AuthContext)

    return (
        <>
            <div className="dropdown-menu" aria-labelledby="triggerId">
                <p className='m-0 d-block d-sm-none text-center'>Welcome, {user ? user.username : 'username'}</p>
                <div className="dropdown-divider d-block d-sm-none"></div>
                <NavLink to={'/'} className='dropdown-item'>Home</NavLink>
                <NavLink to={'/saved'} className='dropdown-item'>Saved countdowns</NavLink>
                <div className="dropdown-divider"></div>
                <NavLink to={'/settings'} className='dropdown-item' end>Settings</NavLink>
                {logged && <button className="dropdown-item" onClick={handleLogout}>Logout</button>}
            </div>
        </>
    )
}
