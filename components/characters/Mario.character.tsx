
type MarioPlayerPropsT = {

}
export const MarioPlayer = ({ time, setScore, xaxis, yaxis, setMarioCords, setTime, handleClickRemoveMario }) => {

    return (
        <div className="mario" style={{
            position: "absolute",
            top: yaxis,
            left: xaxis,
            width: "50px",
            height: "50px",
            backgroundColor: "red",
        }}
            onClick={handleClickRemoveMario}
        ></div>

    )
}