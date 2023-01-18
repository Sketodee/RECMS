import react from 'react'
import useAuth from '../hooks/useAuth'

const Dashboard = () => {

    const {auth } = useAuth()

    return (
        <h1> Welcome {auth.email } </h1>   
     )
}

export default Dashboard