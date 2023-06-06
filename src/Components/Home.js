import Nav from "./Nav";

function Home() {

    return (
        <>
            <Nav />
            <div className="container">
                <div className="form-outline">
                    <input type="search" id="summoner-search" className="form-control text-center1" placeholder="Search for Summoner" aria-label="Search" />
                </div>
            </div>
        </>
    )
}

export default Home;