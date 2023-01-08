import React, { useState, useEffect } from 'react'

const Something = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("Testing/gettest")
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data)
            })
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
            {items.length > 0 ? items.map(item => <p> {item.name}</p>) : <p> Loading ... </p>}
        </div>
        
    );
}

export default Something;