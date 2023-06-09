function MatchHistoryTempOne({ playerInfo, matchResults, matchHistoryData, profileIconUrl }) {
    return (
        <>
            {playerInfo && (
                <div className="player-info-container">
                    <h4 className="text-center player-name-text">{playerInfo.name}</h4>
                    <div className="profile-icon-div">
                        <img
                            className="profile-icon-img"
                            src={profileIconUrl}
                            alt={`Profile Icon for ${playerInfo.name}`}
                        />
                    </div>
                    {matchResults && matchResults.length > 0 ? (
                        <div className="match-history-container">
                            <h5 className="match-history-text text-center">Match History:</h5>
                            {matchResults.map((matchResult, index) => {
                                const matchId = matchHistoryData[index];
                                const team1Won = matchResult.result === "win"; // Check if team 1 won

                                return (
                                    <div key={matchId} className="match-info">
                                        {matchResult && (
                                            <>
                                                <p className={`text-center ${matchResult.result === "VICTORY" ? "victory" : "defeat"}`}>{matchResult.result}</p>
                                                <div>
                                                    <h6 className="game-duration">Game Duration: {matchResult.gameDuration}</h6>
                                                </div>
                                                {matchResult.gameMode === "CLASSIC" ? <div className="gamemode">RANKED</div> : <div className="gamemode">{matchResult.gameMode}</div>}
                                                {/* <div className="text-white">{matchResult.gameMode}</div> */}
                                                <div className="teams-container">
                                                    <div className="team-column">
                                                        <h6 className="side-text text-center">Blue Side</h6>
                                                        <ul className="player-list">
                                                            {matchResult.team1Players.map((player, playerIndex) => (
                                                                <li
                                                                    className={`text-white full-info ${team1Won ? "team-won" : "team-lost"}`} // Apply different classes based on match result
                                                                    key={playerIndex}
                                                                >
                                                                    <img className="champ-image-match" src={player.championImage} alt="Champion" />
                                                                    <span className="player-info">
                                                                        <span className="player-name">{player.summonerName}</span>
                                                                        <span className="kda">{matchResult.team1KDA[playerIndex]}</span>
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="team-column">
                                                        <h6 className="side-text text-center">Red Side</h6>
                                                        <ul className="player-list">
                                                            {matchResult.team2Players.map((player, playerIndex) => (
                                                                <li
                                                                    className={`text-white full-info ${team1Won ? "team-lost" : "team-won"}`} // Apply different classes based on match result
                                                                    key={playerIndex}
                                                                >
                                                                    <img className="champ-image-match" src={player.championImage} alt="Champion" />
                                                                    <span className="player-info">
                                                                        <span className="player-name">{player.summonerName}</span>
                                                                        <span className="kda">{matchResult.team2KDA[playerIndex]}</span>
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="container spinner">
                            <div className="spinner-border text-warning" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default MatchHistoryTempOne;