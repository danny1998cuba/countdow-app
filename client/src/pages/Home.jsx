import React, { useContext, useState } from 'react'
import { Layout } from './Layout'
import { CountdownService } from '../data/services'
import { AuthContext } from '../context'

export const Home = () => {
    const [counts, setCounts] = useState([])
    const [error, setError] = useState(null)

    const { logged } = useContext(AuthContext)

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

    return (
        <Layout title='Home' withLogin={!logged}>
            <p>Home</p>

            <button onClick={loadCounts}>Counts</button>

            {error && <p>{error}</p>}
            {counts.length !== 0 && counts.map(count => (
                <p key={count._id}>{count._id}.- {count.text}</p>
            ))}

        </Layout>
    )
}
