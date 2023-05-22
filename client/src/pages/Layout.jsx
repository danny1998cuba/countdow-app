import React, { useContext } from 'react'
import { Login, Menu } from '../components'
import { AuthContext } from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export const Layout = ({ title = '', withLogin = true, children }) => {
    const { logged, user } = useContext(AuthContext)

    return (
        <>
            <div className="container layout-container">
                <header>
                    <h1>{title}</h1>

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

                <main className='d-flex flex-column-reverse flex-lg-row justify-content-between align-items-start gap-3'>
                    <section className={`${withLogin ? 'withLogin' : ''}`}>
                        {children}
                    </section>
                    {
                        withLogin &&
                        <aside className='d-flex justify-content-center justify-content-lg-end align-items-center align-items-lg-start w-100'>
                            <Login />
                        </aside>
                    }
                </main>
            </div>
        </>
    )
}
