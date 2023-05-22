import React, { useContext, useEffect, useState } from 'react'
import { Layout } from './Layout'
import { AuthContext } from '../context'
import { Login } from '../components'
import { useNavigate } from 'react-router-dom'
import { AuthService, CountdownService } from '../data/services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUser } from '@fortawesome/free-solid-svg-icons'

export const Home = () => {
    const { logged } = useContext(AuthContext)
    const navigate = useNavigate()

    const [users, setUsers] = useState(0)
    const [count, setCount] = useState(0)

    const handleDirection = () => {
        if (logged) {
            navigate('/saved')
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => {
        const asyn = async () => {
            let usersCount = await AuthService.countUsers()
            let countsCount = await CountdownService.count()
            setUsers(usersCount)
            setCount(countsCount)
        }

        asyn()
    }, [])


    return (
        <Layout title='' withLogin={!logged}>
            <section className='d-flex flex-column-reverse flex-lg-row justify-content-between align-items-center gap-3'>
                <div
                    className={`d-flex flex-column justify-content-center align-items-center align-items-md-start
                               home-login-left py-5 h-100`}>

                    <p className='text-center text-sm-start display-3'>Time to</p>

                    <p className='description text-center text-md-start w-75 w-sm-50 mt-4'>
                        Time to is the easiest way to countdown to your most important events.
                        Whether you're counting down to a birthday, the release of a new album,
                        or the start of a vacation, Time to makes it easy to track the time until your big day.
                        With Time to, you can create custom countdown timers for any event and share them with
                        your friends and family. Plus, Time to is available on desktop and mobile devices so you
                        can keep track of your countdown no matter where you are.
                    </p>

                </div>
                <div className={`home-login-right justify-content-center ${logged ? 'justify-content-lg-center d-none d-lg-flex' : 'justify-content-lg-end'}  align-items-center align-items-lg-start`}>
                    {!logged ?
                        <Login /> :
                        <div className="watch-img">
                            <img src="/images/watch.png" alt="Watch" />
                        </div>
                    }
                </div>
            </section>

            <section className='d-flex flex-column flex-lg-row align-items-center justify-content-evenly w-100 py-5 my-5 gap-4'>
                <div className='w-100 watch-img'>
                    <img src="/images/edit.png" alt="Edit preview" className='edit-preview' />
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center align-items-md-start w-100'>
                    <p className='text-center text-sm-start display-5'>Customize your countdowns</p>

                    <p className='description text-center text-md-start w-75 my-4'>
                        Our web allows you to create countdowns for any date or event. You can share your countdown with friends and family, and even set up reminders so you don't forget the date!
                    </p>

                    <button className="btn btn-primary" onClick={handleDirection}>
                        {logged ? 'My countdowns' : 'Sign in'}
                    </button>
                </div>
            </section>

            <section className="d-flex flex-column justify-content-center align-items-center my-5 pb-4">
                <p className="display-5 text-center">A growing app</p>
                <div className="row w-100 mt-4 mb-5">
                    <div className="col-lg-8 offset-lg-2 col-10 offset-1">
                        <div className="d-flex flex-row justify-content-center align-items-center gap-5 flex-wrap">
                            <div className="my-card">
                                <div className="title">
                                    Users registered
                                </div>
                                <div className="row">
                                    <div className="col-8"><p className="number">{users}</p></div>
                                    <div className="col-4">
                                        <div className="icon" style={{ '--icon-color': '#575cef' }}>
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-card">
                                <div className="title">
                                    Total of countdowns
                                </div>
                                <div className="row">
                                    <div className="col-8"><p className="number">{count}</p></div>
                                    <div className="col-4">
                                    <div className="icon" style={{ '--icon-color': '#e04b2d' }}>
                                            <FontAwesomeIcon icon={faClock} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="d-flex flex-column justify-content-center align-items-center my-5">
                <p className="display-5 text-center">Who are we?</p>
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1">
                        <p className="text-center description">
                            d98c_sw is a small software development group that focuses on creating web-based solutions for businesses.
                            We value collaboration and communication, and we believe that these values are essential for producing quality work.
                            Our goal is to provide our clients with superior software solutions that help them grow their business.
                        </p>
                    </div>
                </div>
                <img src="/favicon.ico" alt="icon" width={50} />
            </section>

        </Layout >
    )
}
