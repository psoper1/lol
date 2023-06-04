function DescSection( { champ }) {
    return (
        <>
        <div className="container desc-section">
        <p>{champ.title}</p>
        <p>{champ.blurb}</p>
        </div>
        </>
    )
}

export default DescSection