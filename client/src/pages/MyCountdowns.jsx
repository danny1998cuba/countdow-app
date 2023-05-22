import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { growl } from '@crystallize/react-growl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faPencil, faShareNodes, faTrash } from '@fortawesome/free-solid-svg-icons'

import { ActiveDate, Share } from '../components'
import { CountdownService } from '../data/services'
import { Layout } from './Layout'
import moment from 'moment'
import { PASTEL_COLOURS } from '../data/constants/colors'
import _ from 'lodash'

export const MyCountdowns = () => {
    const navigate = useNavigate()

    const [modalIsOpen, setIsOpen] = useState(false)
    const [counts, setCounts] = useState([])
    const [error, setError] = useState(null)
    const [id, setId] = useState(null)

    const loadCounts = async () => {
        try {
            let countdowns = await CountdownService.getAll()
            setCounts(countdowns)
            setError(null)
        } catch (error) {
            setError(error)
            setCounts([])
        }
    }

    const newCountdown = async () => {
        try {
            let count = await CountdownService.create({
                date: new Date(),
                text: 'New Countdown'
            })

            navigate(`../countdown/edit/${count._id}`);
        } catch (error) {
            await growl({
                title: 'Error',
                message: error.toString(),
                type: 'error'
            })
        }
    }

    const deleteCountdown = async (id) => {
        if (window.confirm('Do you want to delete this coundtown?')) {
            try {
                let res = await CountdownService.delete_(id)
                loadCounts()
                await growl({
                    title: 'Success',
                    message: res.msg.toString(),
                    type: 'info'
                })
            } catch (error) {
                await growl({
                    title: 'Error',
                    message: error.toString(),
                    type: 'error'
                })
            }
        }
    }

    useEffect(() => {
        loadCounts()
    }, [])

    return (
        <Layout title='My Countdowns' withLogin={false}>
            <div className="d-flex w-100 justify-content-end">
                <button className="btn btn-sm btn-primary my-3 me-3" onClick={newCountdown}>New Countdown</button>
            </div>

            {error && <p>{error}</p>}

            <ul className='list-unstyled'>
                {counts.length !== 0 && counts.map(count => (
                    <li className='my-4 p-3' key={count._id}>
                        <div className="row">
                            <div className="col-md-8 mb-3">
                                <div className="row">
                                    <div className="col-md-2 col-3" >
                                        <div
                                            className="avatar p-3 d-flex justify-content-center align-items-center"
                                            style={{ '--bg': PASTEL_COLOURS[count.text.charCodeAt(0) % PASTEL_COLOURS.length] }}>
                                            {count.text.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="col-md-10 col-9">
                                        <div className="w-auto">
                                            <div className='mb-3'>
                                                <span className="me-3">{count.text}</span>
                                                <span className="small">
                                                    <NavLink to={`../countdown/${count._id}`} target='_blank' className='text-decoration-none'>
                                                        Open it <FontAwesomeIcon icon={faAngleRight} title='Open' />
                                                    </NavLink>
                                                </span>
                                                <br />
                                                <div className="d-flex gap-3 mt-2">
                                                    {moment.utc(count.date).startOf('day').format("YYYY-MM-DD")}
                                                    <ActiveDate date={count.date} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex flex-row justify-content-start justify-content-md-end align-items-start gap-3 h-100">
                                    <button className="btn btn-success w-auto" onClick={() => { setId(count._id); setIsOpen(true) }} title='Share'>
                                        <FontAwesomeIcon icon={faShareNodes} />
                                    </button>
                                    <Link className='text-light' to={`../countdown/edit/${count._id}`} >
                                        <button className="btn btn-primary w-auto" title='Update'>
                                            <FontAwesomeIcon icon={faPencil} />
                                        </button>
                                    </Link>
                                    <button className="btn btn-danger w-auto" onClick={() => deleteCountdown(count._id)} title='Delete'>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <Share modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} id={id} />
        </Layout>
    )
}
