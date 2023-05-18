import React, { useEffect, useState } from 'react'
import moment from 'moment'

const styles = {
    common: {
        display: 'inline-block',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        animation: '2s ease-in-out pumping infinite'
    },
    past: {
        backgroundColor: 'red',
    },
    today: {
        backgroundColor: 'yellow',
    },
    future: {
        backgroundColor: 'green',
    }
}

export const ActiveDate = ({ date }) => {
    const [state, setState] = useState({})


    useEffect(() => {
        let mom = moment.utc(new Date()).startOf('day')
        let fromDate = moment.utc(date).startOf('day')
        if (mom.isAfter(fromDate)) setState({ when: 'past', text: 'Finished' })
        if (mom.isSame(fromDate)) setState({ when: 'today', text: 'It\'s today' })
        if (mom.isBefore(fromDate)) setState({ when: 'future', text: 'Active' })
    }, [date])


    return (
        <span className='d-flex justify-centent-center align-items-center'>
            <span className='mx-2' style={{ ...styles.common, ...styles[state.when] }} /> {state.text}
        </span>
    )
}
