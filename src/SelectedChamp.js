import Nav from "./Nav";
import { useRef, useEffect, useState } from 'react';

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
            <section className="page-section">
                <Nav />
                <h1 className='text-center champname text-color'>{champ.name}</h1>
                {championImage && (
                    <img
                        src={championImage}
                        className="img-fluid splash"
                        alt='splash'
                    />
                )}
                <div className="scroll-arrow text-color" onClick={scrollToDetailsSection}>Details</div>
            </section>
            <section className="page-section details-section" ref={detailsSectionRef}>
                <p>I am text in the next section</p>
            </section>
        </div>
    );
}

export default SelectedChamp;