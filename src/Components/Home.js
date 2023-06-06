import BgVideo from "./BgVideo";
import Nav from "./Nav";

function Home() {

    return (
        <>
            <Nav />
            <BgVideo />
            <div className="container search-container">
                <div className="col-md-6 justify-content-center mt-5 pt-3">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Seach for a Summoner" />
                        <div className="input-group-append">
                            <button className="input-group-text search-button"><i className="fa fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;