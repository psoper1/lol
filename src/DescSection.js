function DescSection( { champ }) {
    return (
        <>
        <div className="container desc-section">
        <h1 className="champ-title-desc">{champ.name.toUpperCase()}, {champ.title.toUpperCase()}</h1>
        <div className="line-break"></div>
        <p className="champ-blurb-desc">{champ.blurb}</p>
        </div>
        </>
    )
}

export default DescSection