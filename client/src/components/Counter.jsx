import React, { useEffect, useState } from 'react'
import moment from 'moment/moment';

export const Counter = ({ date }) => {
    const [now, setNow] = useState(new Date());

    const [today, setToday] = useState(false)
    const [before, setBefore] = useState(false)

    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    setInterval(() => {
        setNow(new Date())
    }, 1000);

    useEffect(() => {
        let date_moment = moment.utc(date).startOf('day');
        let now_moment = moment.utc(now).startOf('day');
        let now_moment_exact = moment(now);

        setToday(date_moment.isSame(now_moment))
        setBefore(date_moment.isBefore(now_moment))

        let day, hour, minute
        day = date_moment.diff(now_moment_exact, 'day')
        hour = date_moment.diff(now_moment_exact, 'h')
        minute = date_moment.diff(now_moment_exact, 'minute') - (hour * 60)

        setDays(day)
        setHours(hour - (now_moment_exact.utcOffset() / 60) - (day * 24))
        setMinutes(minute + 1)
    }, [now, date])

    return (
        <>
            <div className="counter">

                {
                    today &&
                    <div className='box d-flex justify-content-center align-items-center px-3 text-center'>
                        <h5>It's the day you were waiting for!!!</h5>
                    </div>
                }
                {
                    before &&
                    <div className='box d-flex justify-content-center align-items-center px-3 text-center'>
                        <h5>The date you were waiting has past.</h5>
                    </div>
                }
                {
                    !today && !before &&
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
