import React, { useEffect, useState } from 'react'

import { DateFunctions } from '../helpers'

export const Counter = ({ date }) => {
    const [now, setNow] = useState(new Date());

    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    setInterval(() => {
        setNow(new Date())
    }, 1000);

    useEffect(() => {
        let [day, hour, minute] = DateFunctions.decomposeInterval(now, date)
        setDays(day)
        setHours(hour)
        setMinutes(minute)
    }, [now, date])

    return (
        <>
            <div className="counter">
                {
                    days < 0 || hours < 0 || minutes < 0 ?
                        <div className='box d-flex justify-content-center align-items-center px-3 text-center'>
                            <h5>La fecha seleccionada ya ha pasado</h5>
                        </div> :
                        <div className="text-center w-100 d-flex justify-content-center">
                            <div className="counter-flex-responsive d-flex gap-4 flex-column">
                                <div className="w-100 box">
                                    <p className="display-4">
                                        {days}
                                    </p>
                                    <div className="small">day{days !== 1 ? 's' : ''}</div>
                                </div>
                                <div className="d-flex flex-row justify-content-evenly w-100 gap-3">
                                    <div className="w-100 box">
                                        <p className="display-6">
                                            {hours}
                                        </p>
                                        <div className="small">hour{hours !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                    <div className="w-100 box">
                                        <p className="display-6">
                                            {minutes}
                                        </p>
                                        <div className="small"> minute{minutes !== 1 ? 's' : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}
