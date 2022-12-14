import { useEffect } from "react";
import { generateRandomBooleanState } from "../level/LevelTwo.level";

type MarioPlayerPropsT = {

}
export const MarioPlayer = ({ time, setScore, xaxis, yaxis, setMarioCords, setTime, setMarioSide }) => {
    /* if mario y is == 500 then make the setTime zero */
    useEffect(() => {
        if (yaxis === 450) {
            console.log("yaxis", yaxis);
            setTime("0")
            const currentScore = {
                number: Math.floor(Math.random() * 100),
                time: time,
            }
            setScore((prev) => [...prev, currentScore]);
            generateRandomBooleanState() ? setMarioSide(true) : setMarioSide(false)
        }
    }, [yaxis])
    /* onclick sleep() and start set mario y 0 */
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const handleClickRemoveMario = async (e) => {
        const copy = e.target;
        const currentScore = {
            number: Math.floor(Math.random() * 100),
            time: time,
        }
        setScore((prev) => [...prev, currentScore]);
        copy.style.display = "none";
        setTime("0");
        const randTime = Math.floor(Math.random() * 5000) + 5000;
        //await sleep(randTime);
        setTime("0");
        copy.style.display = "block";
        generateRandomBooleanState() ? setMarioSide(true) : setMarioSide(false);
        setMarioCords((prev) => {
            return { ...prev, y: 0 }
        })
    }

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