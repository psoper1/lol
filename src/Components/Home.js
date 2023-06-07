import BgVideo from "./BgVideo";
import Nav from "./Nav";
import axios from "axios";
import { useState } from "react";

function Home() {
    const [playerName, setPlayerName] = useState("");
    const [playerInfo, setPlayerInfo] = useState(null);
    const [profileIconUrl, setProfileIconUrl] = useState("");

    const fetchPlayerInfo = async () => {
        try {
            const response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=RGAPI-a2c8a52d-a0f4-459c-9c22-014052e44841`);
            console.log(response.data);
            setPlayerInfo(response.data);

            const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/${response.data.profileIconId}.png`;
            setProfileIconUrl(profileIconUrl);
        } catch (error) {
            console.error('Error retrieving player info:', error);
        }
    };

    const handleSearch = () => {
        fetchPlayerInfo();
    };

    const handleInputField = (event) => {
        setPlayerName(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchPlayerInfo();
        }
    };

    return (
        <>
            <Nav />
            <BgVideo />
            <div className="container">
                <div className="row justify-content-center mt-5 pt-3">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input onKeyDown={handleKeyPress} onChange={handleInputField} id="playerName" type="text" className="form-control" placeholder="Search for a Summoner" />
                            <div className="input-group-append">
                                <button onClick={handleSearch} className="input-group-text search-button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {playerInfo && (
                    <div className="player-info-container">
                        <h4 className="text-center">{playerInfo.name}</h4>
                        <div className='profile-icon-div'>
                            <img className='profile-icon-img' src={profileIconUrl} alt={`Profile Icon for ${playerInfo.name}`} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;