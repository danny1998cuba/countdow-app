import React, { useContext } from 'react'
import { Footer, Login, Menu } from '../components'
import { AuthContext } from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export const Layout = ({ title = '', withLogin = true, children }) => {
    const { logged, user } = useContext(AuthContext)

    return (
        <>
            <div className="container layout-container">
                <div>
                    <header>
                        <NavLink to='/' className='text-light text-decoration-none d-flex flex-row gap-3 align-items-center'>
                            <img src="/images/logo.svg" alt="Logo" width="90" />
                            <h1 className='m-0'>{title}</h1>
                        </NavLink>

                        <div className="dropdown">
                            {
                                logged &&
                                <div className='d-flex flex-row align-items-center gap-3'>
                                    <p className='m-0 d-none d-sm-inline-block'>Welcome, {user ? user.username : 'username'}</p>
                                    <button className="btn text-light dropdown-toggle" type="button" id="triggerId"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <FontAwesomeIcon icon={faBars} />
                                    </button>
                                    <Menu />
                                </div>
                            }
                        </div>
                    </header>

                    <main className=''>
                        {/* <section className={`${withLogin ? 'withLogin' : ''}`}>
                            {children}
                        </section>
                        {
                            withLogin &&
                            <aside className='d-flex justify-content-center justify-content-lg-end align-items-center align-items-lg-start w-100'>
                                <Login />
                            </aside>
                        } */}
                        <section>
                            {children}
                        </section>
                    </main>
                </div>

                <Footer />
            </div>
        </>
    )
}
