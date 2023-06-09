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
                                const team1Won = matchResult.result === "VICTORY";

                                return (
                                    <div key={matchId} className="match-info">
                                        {matchResult && (
                                            <>
                                                <p className={`text-center ${matchResult.result === "VICTORY" ? "victory" : "defeat"}`}>
                                                    {matchResult.result}
                                                </p>
                                                <div>
                                                    <h6 className="game-duration">Game Duration: {matchResult.gameDuration}</h6>
                                                </div>
                                                {matchResult.gameMode === "CLASSIC" ? (
                                                    <div className="gamemode">RANKED</div>
                                                ) : (
                                                    <div className="gamemode">{matchResult.gameMode}</div>
                                                )}
                                                {matchResult.team1Players && matchResult.team1Players.length > 0 && (
                                                    <table className="match-details-table">
                                                        <thead>
                                                            <tr>
                                                                <th className="table-text-color">Summoner</th>
                                                                <th className="damage-dealt-column table-text-color">Damage Dealt</th>
                                                                <th className="table-text-color">Item Build</th>
                                                                <th className="text-center table-text-color">KDA</th>
                                                                <th className="table-text-color">CS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {matchResult.team1Players.map((player, playerIndex) => (
                                                                <tr
                                                                    className={`text-white ${team1Won ? "team-lost" : "team-won"}`}
                                                                    key={playerIndex}
                                                                >
                                                                    <td className="player-info-table">
                                                                        <img className="champ-image-match" src={player.championImage} alt="Champion" />
                                                                        <span className="player-name">{player.summonerName}</span>
                                                                    </td>
                                                                    <td className="damage-row">
                                                                        <div className="dmg-numbers">{player.damageDealt.toLocaleString()}</div>
                                                                        <div className="damage-bar">
                                                                            <div
                                                                                className="damage-filled"
                                                                                style={{ width: `${(player.damageDealt / 50000) * 100}%` }}
                                                                            ></div>
                                                                        </div>
                                                                        <span className="damage-done">{player.damageDealt}</span>
                                                                    </td>
                                                                    <td>Item Build</td> {/* Placeholder for Item Build column */}
                                                                    <td>
                                                                        <span className="kda">{matchResult.team1KDA[playerIndex]}</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="cs">{player.cs}</span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                                {matchResult.team2Players && matchResult.team2Players.length > 0 && (
                                                    <table className="match-details-table-2">
                                                        <thead>
                                                            <tr>
                                                                <th className="table-text-color-2 table-summoner">Summoner</th>
                                                                <th className="damage-dealt-column table-text-color-2">Damage Dealt</th>
                                                                <th className="table-text-color-2">Item Build</th>
                                                                <th className="text-center table-text-color-2">KDA</th>
                                                                <th className="table-text-color-2">CS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {matchResult.team2Players.map((player, playerIndex) => (
                                                                <tr
                                                                    className={`text-white ${team1Won ? "team-won" : "team-lost"}`}
                                                                    key={playerIndex}
                                                                >
                                                                    <td className="player-info-table">
                                                                        <img className="champ-image-match" src={player.championImage} alt="Champion" />
                                                                        <span className="player-name">{player.summonerName}</span>
                                                                    </td>
                                                                    <td className="damage-row">
                                                                        <div className="dmg-numbers">{player.damageDealt.toLocaleString()}</div>
                                                                        <div className="damage-bar">
                                                                            <div
                                                                                className="damage-filled"
                                                                                style={{ width: `${(player.damageDealt / 50000) * 100}%` }}
                                                                            ></div>
                                                                        </div>
                                                                        <span className="damage-done">{player.damageDealt}</span>
                                                                    </td>
                                                                    <td>Item Build</td> {/* Placeholder for Item Build column */}
                                                                    <td>
                                                                        <span className="kda">{matchResult.team2KDA[playerIndex]}</span>
                                                                    </td>
                                                                    <td>
                                                                        <span className="cs">{player.cs}</span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <>
                            <div className="container spinner">
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                            <div className="text-center loading-text">Loading Summoner...</div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default MatchHistoryTempOne;