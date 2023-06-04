import Nav from "./Nav";
import { useRef, useEffect, useState } from 'react';
import SectionTwo from "./SectionTwo";
import DescSection from "./DescSection";
import { FaArrowCircleUp } from 'react-icons/fa';

function SelectedChamp({ champ }) {
  const detailsSectionRef = useRef(null);
  const [newData, setNewData] = useState([]);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const scrollToDetailsSection = () => {
    detailsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToThirdSection = () => {
    const thirdSection = document.querySelector('.page-section-three');
    if (thirdSection) {
      thirdSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowScrollArrow(scrollY > windowHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div>
      <Nav />
      <video autoPlay muted loop className="background-video">
        <source src="https://assets.contentstack.io/v3/assets/blt2ac872571a60ee02/bltc3128a843ac2ef28/618d752b6407fe7f991e9915/background-video-d-01.mp4" type="video/mp4" />
      </video>
      <section className="page-section">
        <h1 className='text-center champname text-color'>{champ.name.toUpperCase()}</h1>
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
        <DescSection champ={champ} />
        <div className="scroll-arrow-bottom text-color text-center section-switch" onClick={scrollToThirdSection}></div>
      </div>
      <div className="page-section-three">
        {showScrollArrow && (
          <>
            <div className="scroll-arrow-up text-color text-center section-switch" onClick={scrollToTop}>
              <FaArrowCircleUp />
            </div>
            <div className="text-to-top">Back to top</div>
          </>
        )}
        <SectionTwo champ={champ} scrollToThirdSection={scrollToThirdSection} />
      </div>
    </div>
  );
}

export default SelectedChamp;