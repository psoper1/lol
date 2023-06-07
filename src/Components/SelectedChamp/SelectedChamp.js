import Nav from "../Nav";
import { useEffect, useState } from 'react';
import SectionTwo from "./SectionTwo";
import DescSection from './DescSection';
import BgVideo from "../BgVideo";
import { Dropdown } from 'react-bootstrap';
import Builds from "./Builds";

function SelectedChamp({ champ }) {
  const [newData, setNewData] = useState([]);
  const [page, setPage] = useState('champion');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 573);

  const api = 'http://127.0.0.1:8000/champs/';

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 573);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        {isSmallScreen ? (
        <Dropdown className='dropdown-container'>
          <Dropdown.Toggle variant="primary" id="pageSelectionDropdown">
            {page.toUpperCase()}
          </Dropdown.Toggle>
          <Dropdown.Menu className='dropdown-text'>
            <Dropdown.Item
              active={page === 'champion'}
              onClick={() => setPage('champion')}
            >
              Champion
            </Dropdown.Item>
            <Dropdown.Item
              active={page === 'description'}
              onClick={() => setPage('description')}
            >
              Description
            </Dropdown.Item>
            <Dropdown.Item
              active={page === 'stats'}
              onClick={() => setPage('stats')}
            >
              Stats
            </Dropdown.Item>
            <Dropdown.Item
              active={page === 'abilities'}
              onClick={() => setPage('abilities')}
            >
              Abilities
            </Dropdown.Item>
            <Dropdown.Item
              active={page === 'builds'}
              onClick={() => setPage('builds')}
            >
              Builds
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <>
          <div className='container page-selection'>
          <div className={`switch-page ${page === 'champion' ? 'active' : ''}`} id='champion' onClick={() => setPage('champion')}>Champion</div>
          <div className={`switch-page ${page === 'description' ? 'active' : ''}`} id='description' onClick={() => setPage('description')}>Description</div>
          <div className={`switch-page ${page === 'stats' ? 'active' : ''}`} id='stats' onClick={() => setPage('stats')}>Stats</div>
          <div className={`switch-page ${page === 'abilities' ? 'active' : ''}`} id='abilities' onClick={() => setPage('abilities')}>Abilites</div>
          <div className={`switch-page ${page === 'builds' ? 'active' : ''}`} id='builds' onClick={() => setPage('builds')}>Builds</div>
        </div>
        </>
      )}
        {page === 'champion' &&
          <section className="img-section">
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
        }
        {page === 'description' &&
          <DescSection champ={champ} />
        }
        {page === 'stats' &&
          <SectionTwo champ={champ} />
        }
        {page === 'builds' &&
          <Builds champ={champ} />
        }
      </div>
    </>
  );
}

export default SelectedChamp;