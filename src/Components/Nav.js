import { NavLink, useLocation } from "react-router-dom";

function Nav() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav d-flex justify-content-between w-50">
                        <li className={`nav-item col ${location.pathname === '/' ? 'active' : ''}`}>
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                        </li>
                        <li className={`nav-item col ${location.pathname === '/champ-list' ? 'active' : ''}`}>
                            <NavLink to="/champ-list" className="nav-link">
                                Full Champ List
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Nav;