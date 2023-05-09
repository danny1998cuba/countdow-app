import React from 'react'
import { Login, Menu } from '../components'
import Bars from '../data/constants/svg/bars.svg'

export const Layout = ({ title = '', children }) => {
    return (
        <>
            <div className="container layout-container">
                <header>
                    <h1>{title}</h1>

                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="triggerId"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={Bars} alt="bars" className='menu-toggle-img' width='15' />
                        </button>
                        <Menu />
                    </div>
                </header>

                <main className='d-flex flex-column flex-md-row-reverse justify-content-between align-items-start gap-3'>
                    <aside className='flex-1'>
                        <Login />
                    </aside>
                    <section className='flex-3'>
                        {children}
                    </section>
                </main>
            </div>
        </>
    )
}
