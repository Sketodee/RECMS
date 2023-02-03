import react, { useState } from 'react'
import useAuth from '../hooks/useAuth'

const Dashboard = () => {

    const { auth } = useAuth()
    
    return (
        <>
            <p> {auth.email} </p>
        </>
     )
}

export default Dashboard