import Nav from "./Nav";

function SelectedChamp({champ}) {
    return (
        <>
        <Nav />
        <h1 className='text-white'>{champ.name}</h1>
        </>
    )
}

export default SelectedChamp;