import './App.css';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function ChampList({champ, setChamp}) {

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
                    <div className="row text-center align-items-center">
                        {data.map(item => (
                            <div key={item.id} className="col-md-1 champ-item">
                                <h2 className='champ-name text-white'>{item.name}</h2>
                                <Link to='/selected-champ'>
                                <img className='champ-icon' src={item.image} alt='champ-icon' onClick={() => setChamp(item)} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChampList;
