import Nav from "./Nav";
import { useRef, useEffect, useState } from 'react';
import SectionTwo from "./SectionTwo";

function SelectedChamp({ champ }) {
  const detailsSectionRef = useRef(null);
  const [newData, setNewData] = useState([]);

  const scrollToDetailsSection = () => {
    detailsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const api = 'http://127.0.0.1:8000/champs/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setNewData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setNewData]);

  if (!newData) {
    return (
      <>
        <Nav />
        <div>Loading...</div>
      </>
    )
  }

  const championImage = newData.find(champion => champion.name === champ.name)?.splash;

  return (
    <div>
      <Nav />
      <section className="page-section">
        <h1 className='text-center champname text-color'>{champ.name}</h1>
        {championImage && (
          <div className="container">
            <img
              src={championImage}
              className="img-fluid splash"
              alt='splash'
            />
          </div>
        )}
        <div className="scroll-arrow text-color text-center section-switch" onClick={scrollToDetailsSection}></div>
      </section>
      <div className="page-section-two" ref={detailsSectionRef}>
        <SectionTwo champ={champ} />
      </div>
    </div>
  );
}

export default SelectedChamp;