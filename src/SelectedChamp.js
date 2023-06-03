import Nav from "./Nav";
import { useRef } from 'react';

function SelectedChamp({ champ }) {
    const detailsSectionRef = useRef(null);

    const scrollToDetailsSection = () => {
        detailsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <section className="page-section">
                <Nav />
                <h1 className='text-center champname text-color'>{champ.name}</h1>
                <img src={champ?.splash} className="img-fluid splash" alt='splash' />
                <div className="scroll-arrow text-color" onClick={scrollToDetailsSection}>Details</div>
            </section>
            <section className="page-section details-section" ref={detailsSectionRef}>
                <p>I am text in the next section</p>
            </section>
        </div>
    );
}

export default SelectedChamp;