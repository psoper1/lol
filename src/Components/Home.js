import BgVideo from "./BgVideo";
import Nav from "./Nav";

function Home() {

    return (
        <>
            <Nav />
            <BgVideo />
            <div className="container search-container">
                <div class="col-md-6 justify-content-center mt-5 pt-3">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Seach for a Summoner" />
                        <div class="input-group-append">
                            <button class="input-group-text search-button"><i class="fa fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;