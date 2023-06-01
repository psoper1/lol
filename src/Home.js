import { Link } from "react-router-dom";

function Home() {

    const handleClick = () => {

    }

    return (
        <>
        <Link to='/champ-list' className='btn btn-primary'>Click to show champs</Link>
        </>
    )
}

export default Home;