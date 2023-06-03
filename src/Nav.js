import { Link } from "react-router-dom";

function Nav() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-custom">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/' className='text-color nav-link'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/champ-list' className='text-color nav-link'>Full Champ List</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav;