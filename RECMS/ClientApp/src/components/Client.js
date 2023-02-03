import react, { useState, useEffect} from 'react' 
import axios from 'axios'
import useAuth from '../hooks/useAuth'

const Client = () => {

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
                console.log(data.data)
            })
            .catch((error) => {
                console.error(error)
            })
     }, [])

    return (
        <div>
            <h2 className="py-3"> Registered Clients </h2>
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Client ID </th>
                        <th> Name  </th>
                        <th> Phone Number (F)</th>
                        <th> Address </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) =>
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.clientId}</td>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.address}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>    
    )
}

export default Client;