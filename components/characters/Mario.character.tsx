import { useEffect } from "react";
import { generateRandomBooleanState } from "../level/LevelTwo.level";
export const MarioPlayer = ({ xaxis, yaxis, setTime, setMarioSide }) => {
    /* if mario y is == 500 then make the setTime zero */
    useEffect(() => {
        if (yaxis === 450) {
            console.log("yaxis", yaxis);
            setTime(0)
            generateRandomBooleanState() ? setMarioSide(true) : setMarioSide(false)
        }
    }, [yaxis])
    return (
        <div className="mario" style={{
            position: "absolute",
            top: yaxis,
            left: xaxis,
            width: "50px",
            height: "50px",
            backgroundColor: "red",
        }}></div>

    )
}