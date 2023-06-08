import BgVideo from "./BgVideo";
import MatchHistoryTempOne from "./MatchHistoryTempOne";
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

            const participantId = matchDetailsResponse.data?.info?.participants.findIndex(
                (participant) => participant.puuid === puuid
            );

            const participant = matchDetailsResponse.data?.info?.participants[participantId];

            const result = participant?.win ? "Win" : "Loss";

            const team1Players = matchDetailsResponse.data?.info?.participants
                .filter((participant) => participant.teamId === 100)
                .map((participant) => participant.summonerName);

            const team2Players = matchDetailsResponse.data?.info?.participants
                .filter((participant) => participant.teamId === 200)
                .map((participant) => participant.summonerName);

            const team1KDA = matchDetailsResponse.data?.info?.participants
                .filter((participant) => participant.teamId === 100)
                .map((participant) => `${participant.kills}/${participant.deaths}/${participant.assists}`);

            const team2KDA = matchDetailsResponse.data?.info?.participants
                .filter((participant) => participant.teamId === 200)
                .map((participant) => `${participant.kills}/${participant.deaths}/${participant.assists}`);

            return {
                result,
                team1Players,
                team2Players,
                team1KDA,
                team2KDA,
            };
        } catch (error) {
            console.error(`Error retrieving match details for match ID ${matchId}:`, error);
            return {
                result: "Unknown",
                team1Players: [],
                team2Players: [],
                team1KDA: [],
                team2KDA: [],
            };
        }
    };

    // Fetches all past 20 games

    // useEffect(() => {
    //     if (matchHistoryData) {
    //         const fetchMatchResults = async () => {
    //             const matchResults = await Promise.all(matchHistoryData.map((matchId) => fetchMatchDetails(matchId)));
    //             setMatchResults(matchResults);
    //             // console.log(matchResults)
    //         };
    //         fetchMatchResults();
    //     }
    // }, [matchHistoryData]);

    // Fetches one game to limit API calls while coding and styling

    useEffect(() => {
        if (matchHistoryData && matchHistoryData.length > 0) {
            const fetchMatchResults = async () => {
                const firstMatchId = matchHistoryData[0];
                const matchResult = await fetchMatchDetails(firstMatchId);
                if (matchResult) {
                    setMatchResults([matchResult]);
                }
            };
            fetchMatchResults();
        }
        // eslint-disable-next-line
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
                <MatchHistoryTempOne playerInfo={playerInfo} profileIconUrl={profileIconUrl} matchResults={matchResults} matchHistoryData={matchHistoryData} />
            </div>
        </>
    );
}

export default Home;