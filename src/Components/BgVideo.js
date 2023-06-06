function BgVideo() {
    return (
        <div className=" container video-container">
        <video autoPlay muted loop className="embed-responsive embed-responsive-4by3 background-video">
          <source src="https://assets.contentstack.io/v3/assets/blt2ac872571a60ee02/bltc3128a843ac2ef28/618d752b6407fe7f991e9915/background-video-d-01.mp4" type="video/mp4" />
        </video>
      </div>
    )
}

export default BgVideo;