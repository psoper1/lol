function SectionTwo({ champ }) {
    return (
        <>
            <div className="container second-section">
                <table className="GeneratedTable">
                    <thead>
                        <tr>
                            {/* <th>Header</th>
                            <th>Header</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-color">Base HP</td>
                            <td className="text-color">{champ.stats.hp}</td>
                        </tr>
                        <tr>
                            <td className="text-color">HP Per Lvl</td>
                            <td className="text-color">{champ.stats.hpperlevel}</td>
                        </tr>
                        <tr>
                            <td className="text-color">Mana</td>
                            <td className="text-color">{champ.stats.mp}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SectionTwo;