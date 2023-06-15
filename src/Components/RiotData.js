// import axios from "axios";

// const fetchMatchDetails = async (matchId, puuid, apiKey) => {
//     try {
//         const matchDetailsResponse = await axios.get(
//             `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`
//         );
//         console.log(matchDetailsResponse);

//         const participantId = matchDetailsResponse.data?.info?.participants.findIndex(
//             (participant) => participant.puuid === puuid
//         );

//         const participant = matchDetailsResponse.data?.info?.participants[participantId];

//         const result = participant?.win ? "VICTORY" : "DEFEAT";

//         const fetchPlayerWithChampionImage = async (participant) => {
//             const championImage = await fetchChampionImage(participant.championName);
//             return { summonerName: participant.summonerName, championImage };
//         };

//         const fetchPlayerWithDamageDealt = async (participant) => {
//             const championImage = await fetchChampionImage(participant.championName);
//             return {
//                 summonerName: participant.summonerName,
//                 championImage,
//                 damageDealt: participant.totalDamageDealtToChampions,
//                 cs: participant.totalMinionsKilled,
//             };
//         };

//         const team1Players = await Promise.all(
//             matchDetailsResponse.data?.info?.participants
//                 .filter((participant) => participant.teamId === 100)
//                 .map(fetchPlayerWithDamageDealt)
//         );

//         const team2Players = await Promise.all(
//             matchDetailsResponse.data?.info?.participants
//                 .filter((participant) => participant.teamId === 200)
//                 .map(fetchPlayerWithDamageDealt)
//         );

//         const team1KDA = matchDetailsResponse.data?.info?.participants
//             .filter((participant) => participant.teamId === 100)
//             .map((participant) => `${participant.kills}/${participant.deaths}/${participant.assists}`);

//         const team2KDA = matchDetailsResponse.data?.info?.participants
//             .filter((participant) => participant.teamId === 200)
//             .map((participant) => `${participant.kills}/${participant.deaths}/${participant.assists}`);

//         const gameMode = matchDetailsResponse.data?.info?.gameMode;

//         const gameDurationInSeconds = matchDetailsResponse.data?.info?.gameDuration;
//         const minutes = Math.floor(gameDurationInSeconds / 60);
//         const seconds = gameDurationInSeconds % 60;
//         const gameDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

//         return {
//             result,
//             team1Players,
//             team2Players,
//             team1KDA,
//             team2KDA,
//             gameDuration,
//             gameMode,
//         };
//     } catch (error) {
//         console.error(`Error retrieving match details for match ID ${matchId}:`, error);
//         return {
//             result: "Unknown",
//             team1Players: [],
//             team2Players: [],
//             team1KDA: [],
//             team2KDA: [],
//             gameDuration: "Unknown",
//         };
//     }
// };

// export { fetchMatchDetails };