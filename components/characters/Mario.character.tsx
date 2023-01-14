
type MarioPlayerPropsT = {
    xaxis: number;
    yaxis: number;
    marioRef?: any;
}
export const MarioPlayer = ({ xaxis, yaxis, marioRef }: MarioPlayerPropsT) => {
    return (
        <div className="mario"
            ref={marioRef}
            id="mario-man"
            style={{
                backgroundImage: "url(https://researchone-game.vercel.app/images/mario.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                top: yaxis,
                left: xaxis,
                width: "50px",
                height: "50px",
            }}
        >
        </div>

    )
}