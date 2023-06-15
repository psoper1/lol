function DescSection({ champ }) {
  return (
    <>
      <div className="container desc-section">
        <h1 className="champ-title-desc">
          {champ.name.toUpperCase()}, {champ.title.toUpperCase()}
        </h1>
        <div className="line-break"></div>
        <h3 className="champ-blurb-desc fs-md-3">{champ.blurb}</h3>
      </div>
    </>
  );
}

export default DescSection;
