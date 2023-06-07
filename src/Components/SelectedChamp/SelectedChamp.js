import Nav from "../Nav";
import { useRef, useEffect, useState } from 'react';
import SectionTwo from "./SectionTwo";
import DescSection from './DescSection';
import { FaArrowCircleUp } from 'react-icons/fa';
import BgVideo from "../BgVideo";

function SelectedChamp({ champ }) {
  const detailsSectionRef = useRef(null);
  const [newData, setNewData] = useState([]);

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
        <div className="container spinner">
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      </>
    )
  }

  const championImage = newData.find(champion => champion.name === champ.name)?.splash;

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <BgVideo />
        <section className="page-section">
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <h1 className="champname">{champ.name.toUpperCase()}, {champ.title.toUpperCase()}</h1>
              </div>
            </div>
            {championImage && (
              <div className="row">
                <div className="col">
                  <img
                    src={championImage}
                    className="img-fluid splash"
                    alt='splash'
                  />
                </div>
              </div>
            )}
          </div>
        </section>
        <div className="container page-section-two" ref={detailsSectionRef}>
          <div className="row">
            <div className="col">
              <DescSection champ={champ} />
            </div>
          </div>
          <div className="row">
          </div>
        </div>
        <div className="container page-section-three">
          <div className="row">
            <div className="col">
              <SectionTwo champ={champ} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectedChamp;