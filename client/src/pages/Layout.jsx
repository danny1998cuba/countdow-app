import React, { useContext } from 'react'
import { Login, Menu } from '../components'
import { AuthContext } from '../context'
import Bars from '../data/constants/svg/bars.svg'

export const Layout = ({ title = '', withLogin = true, children }) => {
    const { logged } = useContext(AuthContext)

    return (
        <>
            <div className="container layout-container">
                <header>
                    <h1>{title}</h1>

                    <div className="dropdown">
                        {
                            logged && <>
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src={Bars} alt="bars" className='menu-toggle-img' width='15' />
                                </button>
                                <Menu />
                            </>
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
