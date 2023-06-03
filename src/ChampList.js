import './App.css';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Nav from './Nav';
import axios from 'axios';

function ChampList({ champ, setChamp, data, setData }) {

    const [championData, setChampionData] = useState(null);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'http://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion.json'
                );
                const data = await response.json();
                setChampionData(data.data);
            } catch (error) {
                console.error('Error fetching champion data:', error);
            }
        };

        fetchData();
    }, []);

    if (!championData) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <Nav />
            <div className="container">
                <div className="scrollable-container">
                    <div className="row text-center align-items-center">
                        {Object.values(championData).map((item) => (
                            <div key={item.id} className="col-md-1 champ-item">
                                <h2 className="text-color champ-name">{item.name}</h2>
                                <Link to="/selected-champ">
                                    <img
                                        className="champ-icon"
                                        src={data.find(champ => champ.name === item.name)?.image}
                                        alt="champ-icon"
                                        onClick={() => setChamp(item)}
                                    />
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
