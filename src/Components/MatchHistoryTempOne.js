function MatchHistoryTempOne({playerInfo, matchResults, matchHistoryData}) {
    return (
        <>
            {playerInfo && (
                <div className="player-info-container">
                    {/* ... */}
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
                                                            <li className="text-white" key={playerIndex}>{player}</li>
                                                        ))}
                                                    </ul>
                                                    <h6 className="text-white">Team 2 Players:</h6>
                                                    <ul className="player-list">
                                                        {matchResult.team2Players.map((player, playerIndex) => (
                                                            <li className="text-white" key={playerIndex}>{player}</li>
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