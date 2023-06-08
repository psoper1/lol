function MatchHistoryTempOne({ playerInfo, matchResults, matchHistoryData, profileIconUrl }) {
    return (
        <>
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
                    {matchResults && matchResults.length > 0 ? (
                        <div className="match-history-container">
                            <h5>Match History:</h5>
                            {matchResults.map((matchResult, index) => {
                                const matchId = matchHistoryData[index];
                                return (
                                    <div key={matchId} className="match-info">
                                        <div>
                                            <h6 className="text-white">Game Duration: {matchResult.gameDuration}</h6>
                                        </div>
                                        {matchResult && (
                                            <>
                                                <p className="text-white">Result: {matchResult.result}</p>
                                                <div className="teams-container">
                                                    <div className="team-column">
                                                        <h6 className="text-white text-center">Blue Side</h6>
                                                        <ul className="player-list">
                                                            {matchResult.team1Players.map((player, playerIndex) => (
                                                                <li className="text-white" key={playerIndex}>
                                                                    <img className='champ-image-match' src={player.championImage} alt="Champion" />
                                                                    {player.summonerName} (K/D/A: {matchResult.team1KDA[playerIndex]})
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="team-column">
                                                        <h6 className="text-white text-center">Red Side</h6>
                                                        <ul className="player-list">
                                                            {matchResult.team2Players.map((player, playerIndex) => (
                                                                <li className="text-white" key={playerIndex}>
                                                                    <img className='champ-image-match' src={player.championImage} alt="Champion" />
                                                                    {player.summonerName} (K/D/A: {matchResult.team2KDA[playerIndex]})
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
                        <p className="text-white">Loading Data...</p>
                    )}
                </div>
            )}
        </>
    );
}

export default MatchHistoryTempOne;