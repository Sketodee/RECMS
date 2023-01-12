import React, { useState, useEffect } from 'react'
import Login from './Login';
import axios from 'axios'

const Something = () => {

    const [items, setItems] = useState([]);

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

    console.log(items)
    console.log("why")

    const Display = (item) => {
        return (
            <p> {item.name} </p>
            )
    }

    return (
        <div>
            <p> something works here </p>
            <button className="btn btn-success"> i am me </button>
            {items.length > 0 ? items.map(item => <p key={ item.id}> {item.name}</p>) : <p> Loading ... </p>}
            <Login />
        </div>
        
    );
}

export default Something;