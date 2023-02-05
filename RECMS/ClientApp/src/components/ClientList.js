import {useState, useEffect } from 'react'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

const ClientList = () => {

    const { auth } = useAuth()
    const [items, setItems] = useState([])

    useEffect(() => {
        axios.get("Client/getregisteredclients", {
            headers: {
                'Authorization': `bearer ${auth.token}`
            }
        })
            .then((res) => {
                var data = res.data
                setItems(data.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Client ID </th>
                    <th> Name  </th>
                    <th> Phone </th>
                    <th> Address </th>
                </tr>
            </thead>
            <tbody>
                {items.length> 0 ? items.map((item, index) =>
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.clientId}</td>
                        <td>{item.name}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.address}</td>
                    </tr>
                ) : <p className = "py-3"> No Registered Clients </p>}
            </tbody>
        </table>
     )
}

export default  ClientList