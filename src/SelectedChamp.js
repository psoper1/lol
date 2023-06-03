import Nav from "./Nav";

function SelectedChamp({champ}) {
    return (
        <>
        <Nav />
        <h1 className='text-center champname text-color'>{champ.name}</h1>
        <img src={champ?.splash} className="img-fluid splash" alt='splash'/>
        </>
    )
}

export default SelectedChamp;