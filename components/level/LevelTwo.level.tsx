import { useEffect, useRef, useState } from "react";
import { MarioPlayer } from "../characters/Mario.character";
import { StopWatch } from "../component/left/leftcontainer.left";

/* generate random true false */
export const generateRandomBooleanState = () => {
    return Math.random() >= 0.5;
};

const LevelTwo = ({ setScore }) => {
    const [tunnelCords, setTunnelCords] = useState({
        x: 0,
        y: 0,
    });
    const [marioCords, setMarioCords] = useState({
        x: 0,
        y: 0,
    });
    const [marioSide, setMarioSide] = useState(false);

    const [time, setTime] = useState("0");
    const leftContainerRef = useRef(null);
    const leftTunnelRef = useRef(null);
    const rightTunnelRef = useRef(null);

    useEffect(() => {
        const height = leftContainerRef.current.clientHeight;
        const width = leftContainerRef.current.clientWidth;
        console.log(height, width);
        generateRandomBooleanState() ? setMarioSide(true) : setMarioSide(false)
        // setTunnelCords({
        //     x: width / 2 - 20,
        //     y: 500 - 80,
        // }); 
        //? not required to level two
        return console.log("leftContainerRef.current", leftContainerRef.current);
        /* height width */
    }, [leftContainerRef]);


    useEffect(() => {
        /* increase marios from top to bottom if bottom == 500px then make 0 */
        const interval = setInterval(() => {
            /* get xaxis of leftTunnelRef, RightTunnelRef */
            if (marioSide) {
                setMarioCords({
                    ...marioCords,
                    x: 100,
                })
                /* y: marioCords.y > 440 ? 0 : marioCords.y + 10, */
                if (marioCords.y > 440) {
                    setMarioCords({
                        ...marioCords,
                        y: 0,
                    })
                    console.log("Logging Mario...");
                } else {
                    setMarioCords({
                        ...marioCords,
                        y: marioCords.y + 10,
                    })
                }
            } else {
                setMarioCords({
                    ...marioCords,
                    x: 340, 
                    y: marioCords.y > 440 ? 0 : marioCords.y + 10,
                })
            }
        }, 100);
        return () => clearInterval(interval);
    }, [marioCords]);

    return (
        <div
            className="relative  col-span-2 border bg-green-400  w-full md:h-[502px]"
            ref={leftContainerRef}
        >
            <div 
                className="absolute flex justify-around bottom-0 left-0 right-0 border-dotted border-2 border-black h-20">
                <div className="tunnel bg-blue-500 h-20 w-20"></div>
                <div className="tunnel bg-gray-500 h-20 w-20" ></div>
            </div>
            <StopWatch setScore={setScore} setMarioSide={setMarioSide} setMarioCords={setMarioCords} time={time} setTime={setTime} />
            <MarioPlayer
                xaxis={marioCords.x}
                yaxis={marioCords.y} setMarioCords={setMarioCords}
                setTime={setTime}
                setMarioSide={setMarioSide}
                setScore={setScore}
                time={time}
            />
        </div>
    );
};

export default LevelTwo;
