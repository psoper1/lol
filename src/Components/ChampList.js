import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import top from '../imgs/lanes/Top_icon.png';
import jungle from '../imgs/lanes/Jungle_icon.png';
import mid from '../imgs/lanes/Middle_icon.png';
import bot from '../imgs/lanes/Bottom_icon.png';
import support from '../imgs/lanes/Support_icon.png';
import fill from '../imgs/lanes/fill.png';
import BgVideo from './BgVideo';

function ChampList({ setChamp, data, setData }) {
    const [championData, setChampionData] = useState(null);
    const [selectedLane, setSelectedLane] = useState('all');
    const [columnClass, setColumnClass] = useState('col-md-1 champ-item')
    const apiChamps = 'http://127.0.0.1:8000/champs/';

    useEffect(() => {
        fetch(apiChamps)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [setData]);

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

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 766) {
                setColumnClass('col-sm-3 champ-item');
            } else if (screenWidth <= 990) {
                setColumnClass('col-md-2 champ-item');
            } else {
                setColumnClass('col-md-1 champ-item');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!championData) {
        return <div>Loading...</div>;
    }

    const filteredChampions = selectedLane === 'all'
        ? Object.values(championData)
        : Object.values(championData).filter((item) =>
            data.some((champ) =>
                champ.name === item.name &&
                champ.lane.some((lane) => lane.lane === selectedLane)
            )
        );

    return (
        <>
            <Nav />
            <BgVideo />
            <div className='container lane-icons'>
                <img
                    src={fill}
                    alt='fill'
                    className={`lane-icon ${selectedLane === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedLane('all')}
                />
                <img
                    src={top}
                    alt='top'
                    className={`lane-icon ${selectedLane === 'Top' ? 'active' : ''}`}
                    onClick={() => setSelectedLane('Top')}
                />
                <img
                    src={jungle}
                    alt='jungle'
                    className={`lane-icon ${selectedLane === 'Jungle' ? 'active' : ''}`}
                    onClick={() => setSelectedLane('Jungle')}
                />
                <img
                    src={mid}
                    alt='mid'
                    className={`lane-icon ${selectedLane === 'Mid' ? 'active' : ''}`}
                    onClick={() => setSelectedLane('Mid')}
                />
                <img
                    src={bot}
                    alt='bot'
                    className={`lane-icon ${selectedLane === 'Bot' ? 'active' : ''}`}
                    onClick={() => setSelectedLane('Bot')}
                />
                <img
                    src={support}
                    alt='support'
                    className={`lane-icon ${selectedLane === 'Support' ? 'active' : ''}`}
                    onClick={() => setSelectedLane('Support')}
                />
            </div>
            <div className="container">
                <div className="scrollable-container">
                    <div className="row text-center align-items-center">
                        {filteredChampions.map(item => (
                            <div key={item.id} className={columnClass}>
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