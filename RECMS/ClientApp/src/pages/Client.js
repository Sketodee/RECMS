import react from 'react' 
import AddClient from '../components/AddClient';
import ClientList from '../components/ClientList'

const Client = () => {

    return (
        <div>
            <AddClient />
            <ClientList />
        </div>    
    )
}

export default Client;