import PieChart from "./PieChart";


function SectionTwo({ champ }) {
    return (
        <>
        <div className="container table-data">
            <table className="GeneratedTable second-section">
                <thead>
                    <tr>
                        {/* <th>Header</th>
                            <th>Header</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-color att-name">Base HP</td>
                        <td className="text-color text-center">{champ.stats.hp}</td>
                    </tr>
                    <tr>
                        <td className="text-color">HP Per Lvl</td>
                        <td className="text-color text-center">{champ.stats.hpperlevel}</td>
                    </tr>
                    <tr>
                        <td className="text-color">Mana</td>
                        <td className="text-color text-center">{champ.stats.mp}</td>
                    </tr>
                    <tr>
                        <td className="text-color">Movespeed</td>
                        <td className="text-color text-center">{champ.stats.movespeed}</td>
                    </tr>
                    <tr>
                        <td className="text-color">Armor</td>
                        <td className="text-color text-center">{champ.stats.armor}</td>
                    </tr>
                    <tr>
                        <td className="text-color">Attack Range</td>
                        <td className="text-color text-center">{champ.stats.attackrange}</td>
                    </tr>
                    <tr>
                        <td className="text-color">AD</td>
                        <td className="text-color text-center">{champ.stats.attackdamage}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className='pie-chart'>
                <PieChart champ={champ} />
            </div>
        </>
    )
}

export default SectionTwo;