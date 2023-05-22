import React, { useContext } from 'react'
import { Layout } from './Layout'
import { AuthContext } from '../context'

export const Home = () => {
    const { logged } = useContext(AuthContext)

    return (
        <Layout title='' withLogin={!logged}>

        </Layout>
    )
}
