import BgVideo from "./BgVideo";
import MatchHistoryTempOne from "./MatchHistoryTempOne";
import Nav from "./Nav";
import axios from "axios";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";

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

  const fetchChampionImage = async (championName) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/champs/");
      const champions = response.data;

      const fuseOptions = {
        keys: ["name"],
        includeScore: true,
        threshold: 0.4,
      };

      const fuse = new Fuse(champions, fuseOptions);

      let searchResults;
      if (championName === "MonkeyKing") {
        searchResults = fuse.search("Wukong");
      } else {
        searchResults = fuse.search(championName);
      }

      if (searchResults.length > 0) {
        const closestMatch = searchResults[0].item;
        return closestMatch.image;
      } else {
        console.error(`Champion not found: ${championName}`);
        return null;
      }
    } catch (error) {
      console.error(
        `Error retrieving champion image for ${championName}:`,
        error
      );
      return null;
    }
  };

  const fetchMatchDetails = async (matchId) => {
    try {
      const matchDetailsResponse = await axios.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`
      );

      const participantId =
        matchDetailsResponse.data?.info?.participants.findIndex(
          (participant) => participant.puuid === puuid
        );

      const participant =
        matchDetailsResponse.data?.info?.participants[participantId];

      const result = participant?.win;
      // eslint-disable-next-line
      const fetchPlayerWithChampionImage = async (participant) => {
        const championImage = await fetchChampionImage(
          participant.championName
        );
        return { summonerName: participant.summonerName, championImage };
      };

      const getPlayerItems = async (participant) => {
        const items = [];
        for (let i = 0; i <= 5; i++) {
          const itemId = participant[`item${i}`];
          if (itemId) {
            items.push({ itemId });
          }
        }
        return items;
      };

      const fetchPlayerWithDamageDealt = async (participant) => {
        const championImage = await fetchChampionImage(
          participant.championName
        );
        const playerItems = await getPlayerItems(participant);
        return {
          summonerName: participant.summonerName,
          championImage,
          damageDealt: participant.totalDamageDealtToChampions,
          cs: participant.totalMinionsKilled,
          playerItems,
        };
      };

      const team1Players = await Promise.all(
        matchDetailsResponse.data?.info?.participants
          .filter((participant) => participant.teamId === 100)
          .map(fetchPlayerWithDamageDealt)
      );

      const team2Players = await Promise.all(
        matchDetailsResponse.data?.info?.participants
          .filter((participant) => participant.teamId === 200)
          .map(fetchPlayerWithDamageDealt)
      );

      const team1KDA = matchDetailsResponse.data?.info?.participants
        .filter((participant) => participant.teamId === 100)
        .map(
          (participant) =>
            `${participant.kills}/${participant.deaths}/${participant.assists}`
        );

      const team2KDA = matchDetailsResponse.data?.info?.participants
        .filter((participant) => participant.teamId === 200)
        .map(
          (participant) =>
            `${participant.kills}/${participant.deaths}/${participant.assists}`
        );

      const gameMode = matchDetailsResponse.data?.info?.gameMode;

      const gameDurationInSeconds =
        matchDetailsResponse.data?.info?.gameDuration;
      const minutes = Math.floor(gameDurationInSeconds / 60);
      const seconds = gameDurationInSeconds % 60;
      const gameDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

      const team1PlayerItems = await Promise.all(
        team1Players.map(getPlayerItems)
      );
      const team2PlayerItems = await Promise.all(
        team2Players.map(getPlayerItems)
      );

      //   console.log(matchDetailsResponse);

      return {
        result,
        team1Players,
        team2Players,
        team1KDA,
        team2KDA,
        gameDuration,
        gameMode,
        team1PlayerItems,
        team2PlayerItems,
      };
    } catch (error) {
      console.error(
        `Error retrieving match details for match ID ${matchId}:`,
        error
      );
      return {
        result: "Unknown",
        team1Players: [],
        team2Players: [],
        team1KDA: [],
        team2KDA: [],
        gameDuration: "Unknown",
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

  useEffect(() => {
    if (matchHistoryData && matchHistoryData.length > 0) {
      const fetchMatchResults = async () => {
        const matchResults = await Promise.all(
          matchHistoryData.slice(0, 20).map((matchId) => fetchMatchDetails(matchId))
        );
        setMatchResults(matchResults);
      };
      fetchMatchResults();
    }
  }, [matchHistoryData]);

  // Fetches one game to limit API calls while coding and styling

  // useEffect(() => {
  //   if (matchHistoryData && matchHistoryData.length > 0) {
  //     const fetchMatchResults = async () => {
  //       const firstMatchId = matchHistoryData[0];
  //       const matchResult = await fetchMatchDetails(firstMatchId);
  //       if (matchResult) {
  //         setMatchResults([matchResult]);
  //       }
  //     };
  //     fetchMatchResults();
  //   }
  //   // eslint-disable-next-line
  // }, [matchHistoryData]);

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
                <button
                  onClick={handleSearch}
                  className="input-group-text search-button"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <MatchHistoryTempOne
          playerInfo={playerInfo}
          profileIconUrl={profileIconUrl}
          matchResults={matchResults}
          matchHistoryData={matchHistoryData}
        />
      </div>
    </>
  );
}

export default Home;
