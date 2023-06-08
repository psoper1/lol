function MatchHistoryAllTwenty() {
    return (
        <>
            {/* {playerInfo && (
                    <div className="player-info-container">
                        <h4 className="text-center">{playerInfo.name}</h4>
                        <div className="profile-icon-div">
                            <img
                                className="profile-icon-img"
                                src={profileIconUrl}
                                alt={`Profile Icon for ${playerInfo.name}`}
                            />
                        </div>
                        {matchResults && matchHistoryData && (
                            <div className="match-history-container">
                                <h5>Match History:</h5>
                                {matchHistoryData.map((matchId, index) => {
                                    const matchResult = matchResults[index];
                                    return (
                                        <div key={matchId} className="match-info">
                                            <h6 className="text-white">Match ID: {matchId}</h6>
                                            <p className="text-white">Result: {matchResult.result}</p>
                                            <div>
                                                <div className="team-players">
                                                    <h6 className="text-white">Team 1 Players:</h6>
                                                    <ul className="player-list">
                                                        {matchResult.team1Players.map((player, playerIndex) => (
                                                            <li className="text-white" key={playerIndex}>{player}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="team-players">
                                                    <h6 className="text-white">Team 2 Players:</h6>
                                                    <ul className="player-list">
                                                        {matchResult.team2Players.map((player, playerIndex) => (
                                                            <li className="text-white" key={playerIndex}>{player}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )} */}
        </>
    )
}

export default MatchHistoryAllTwenty;