import React, { useState, useEffect, useContext} from 'react'
import Login from './Login';
import axios from 'axios';
import AuthContext from "../context/AuthProvider"


const Something = () => {

    const [items, setItems] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        axios.get("Testing/gettest").then((response) => {
            var data = response.data;
            setItems(data);
        });
        //fetch("Testing/gettest")
        //    .then((results) => {
        //        return results.json();
        //    })
        //    .then(data => {
        //        setItems(data)
        //    })
    }, [])


    const Display = (item) => {
        return (
            <p> {item.name},  </p>
            )
    }

    return (
        <div>
            <p> something works here, {auth?.email} </p>
            <button className="btn btn-success"> i am me </button>
            {items.length > 0 ? items.map(item => <p key={ item.id}> {item.name}</p>) : <p> Loading ... </p>}
        </div>
        
    );
}

export default Something;