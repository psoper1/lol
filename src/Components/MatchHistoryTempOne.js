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
                    {matchResults && matchResults.length > 0 && (
                        <div className="match-history-container">
                            <h5>Match History:</h5>
                            {matchResults.map((matchResult, index) => {
                                const matchId = matchHistoryData[index];
                                return (
                                    <div key={matchId} className="match-info">
                                        <h6 className="text-white">Match ID: {matchId}</h6>
                                        {matchResult && (
                                            <>
                                                <p className="text-white">Result: {matchResult.result}</p>
                                                <div>
                                                    <h6 className="text-white">Team 1 Players:</h6>
                                                    <ul className="player-list">
                                                        {matchResult.team1Players.map((player, playerIndex) => (
                                                            <li className="text-white" key={playerIndex}>
                                                                {player} (K/D/A: {matchResult.team1KDA[playerIndex]})
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <h6 className="text-white">Team 2 Players:</h6>
                                                    <ul className="player-list">
                                                        {matchResult.team2Players.map((player, playerIndex) => (
                                                            <li className="text-white" key={playerIndex}>
                                                                {player} (K/D/A: {matchResult.team2KDA[playerIndex]})
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                {/* Additional data */}
                                                <div>
                                                    <h6 className="text-white">Game Duration: {matchResult.gameDuration}</h6>
                                                    {/* Include more data as needed */}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default MatchHistoryTempOne;