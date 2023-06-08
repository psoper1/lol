import BgVideo from "./BgVideo";
import Nav from "./Nav";
import axios from "axios";
import { useState, useEffect } from "react";

function Home() {
    const [playerName, setPlayerName] = useState("");
    const [playerInfo, setPlayerInfo] = useState(null);
    const [profileIconUrl, setProfileIconUrl] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [puuid, setPuuid] = useState("");
    const [matchHistoryData, setMatchHistoryData] = useState(null);
    const [matchResults, setMatchResults] = useState(null);

    useEffect(() => {
        axios
            .get("/api/get_riot_api_key/")
            .then((response) => {
                setApiKey(response.data.api_key);
            })
            .catch((error) => {
                console.error("Error fetching Riot API key:", error);
            });
    }, []);

    const fetchPlayerInfo = async () => {
        try {
            const response = await axios.get(
                `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${apiKey}`
            );
            setPlayerInfo(response.data);
            setPuuid(response.data.puuid);

            const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/${response.data.profileIconId}.png`;
            setProfileIconUrl(profileIconUrl);

            const matchHistoryResponse = await axios.get(
                `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${response.data.puuid}/ids?api_key=${apiKey}`
            );
            setMatchHistoryData(matchHistoryResponse.data);
            // console.log(matchHistoryResponse.data)
        } catch (error) {
            console.error("Error retrieving player info:", error);
            alert("Error retrieving player info:");
        }
    };

    const fetchMatchDetails = async (matchId) => {
        try {
            const matchDetailsResponse = await axios.get(
                `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`
            );
            console.log(matchDetailsResponse);
            const participantId = matchDetailsResponse.data?.info?.participants.findIndex(
                (participant) => participant.summonerName === playerName
            );
            console.log(participantId);
            const participant = matchDetailsResponse.data?.info?.participants[participantId];
            console.log(participant);
            const result = participant.win ? "Win" : "Loss";
            return result;
        } catch (error) {
            console.error(`Error retrieving match details for match ID ${matchId}:`, error);
            return null;
        }
    };

    useEffect(() => {
        if (matchHistoryData) {
            const fetchMatchResults = async () => {
                const matchResults = await Promise.all(matchHistoryData.map((matchId) => fetchMatchDetails(matchId)));
                setMatchResults(matchResults);
                // console.log(matchResults)
            };
            fetchMatchResults();
        }
    }, [matchHistoryData]);

    const handleSearch = () => {
        fetchPlayerInfo();
    };

    const handleInputField = (event) => {
        setPlayerName(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
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
                            <input
                                onKeyDown={handleKeyPress}
                                onChange={handleInputField}
                                id="playerName"
                                type="text"
                                className="form-control"
                                placeholder="Search for a Summoner"
                            />
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
                        <div className="profile-icon-div">
                            <img
                                className="profile-icon-img"
                                src={profileIconUrl}
                                alt={`Profile Icon for ${playerInfo.name}`}
                            />
                        </div>
                        {matchResults && (
                            <div className="match-history-container">
                                <h5>Match History:</h5>
                                {matchHistoryData.map((matchId, index) => (
                                    <div key={matchId} className="match-info">
                                        <h6>Match ID: {matchId}</h6>
                                        <p>Result: {matchResults[index]}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;