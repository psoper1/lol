import './App.css';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function ChampList() {

    const [data, setData] = useState([]);
    const apiChamps = 'http://127.0.0.1:8000/champs/';

    useEffect(() => {
        fetch(apiChamps)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <>
        <Link to='/' className='btn btn-primary'>Home</Link>
        <div className="container">
            <div className="scrollable-container">
                <div className="row text-center">
                    {data.map(item => (
                        <div key={item.id} className="col-md-2 champ-item">
                            <h2 className='champ-name'>{item.name}</h2>
                            <img className='champ-icon' src={item.image} alt='champ-icon' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default ChampList;
