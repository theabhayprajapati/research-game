import { useEffect, useRef, useState } from "react";
import { INITAL_MARIO_CORDS, INITAL_TUNNEL_CORDS, TUNNEL_HEIGHT, TUNNEL_WIDTH } from "../../globals/constants";
import { generateRandomBooleanState, sleep } from "../../globals/methods";
import { boardSizeT } from "../../globals/types";
import { MarioPlayer } from "../characters/Mario.character";
import Tunnel from "../characters/Tunnel";
import { Stopwatch } from "../component/Stopwatch";

const randomInitBool = generateRandomBooleanState();
const LevelTwo = ({ setScore }) => {
    const [showMario, setShowMario] = useState(false);
    const [tunnelOneCords, setTunnelOneCords] = useState(INITAL_TUNNEL_CORDS);
    const [tunnelTwoCords, setTunnelTwoCords] = useState(INITAL_TUNNEL_CORDS);
    const [marioCords, setMarioCords] = useState(INITAL_MARIO_CORDS);
    const [BoardMeasrment, setBoardMeasrment] = useState<boardSizeT>({
        height: undefined,
        width: undefined,
    });
    const [isRunning, setIsRunning] = useState(false);
    const [marioSide, setMarioSide] = useState(randomInitBool);
    const [time, setTime] = useState("0");
    const leftContainerRef = useRef(null);
    const [milliseconds, setMilliseconds] = useState(0);


    useEffect(() => {
        setIsRunning(true);
        const height = leftContainerRef.current.clientHeight;
        const width = leftContainerRef.current.clientWidth;
        setBoardMeasrment({
            height,
            width,
        });

        setTunnelOneCords({
            x: ((width / 2) / 2) - TUNNEL_WIDTH / 2,
            y: height - TUNNEL_HEIGHT,
        });
        setTunnelTwoCords({
            x: ((width / 2) * 1.5) - (TUNNEL_WIDTH / 2),
            y: height - TUNNEL_HEIGHT,
        });
        sleep(0).then(() => {
            var marioXaxisLeft = (((BoardMeasrment.width / 2) / 2) - MARIO_WIDTH / 2);
            var marioXaxisRight = (((BoardMeasrment.width / 2) * 1.5) - MARIO_WIDTH / 2);

            var side = generateRandomBooleanState();
            setMarioCords({
                y: 0,
                x: side ? marioXaxisLeft : marioXaxisRight,
            })
        });
    }, [leftContainerRef]);

    useEffect(() => {
        document.addEventListener("keydown", handleClickRemoveMario);
        return () => {
            document.removeEventListener("keydown", handleClickRemoveMario);
        };
    }, []);

    const marioCreation = () => {
        setShowMario(false);
        setMilliseconds(0);
        var marioXaxisLeft = (((BoardMeasrment.width / 2) / 2) - MARIO_WIDTH / 2);
        var marioXaxisRight = (((BoardMeasrment.width / 2) * 1.5) - MARIO_WIDTH / 2);
        var pause: number;
        // pause = randomNumberBW(2000, 10000);
        pause = 0;
        var side = generateRandomBooleanState();
        sleep(pause).then(() => {
            setShowMario(true);
            setMarioCords({
                y: 0,
                x: side ? marioXaxisLeft : marioXaxisRight,
            })
        });
    };

    const handleClickRemoveMario = (event) => {
        /* right arrow key */

        if (event.keyCode === 37) {
            console.log(showMario);
            setShowMario(false);
            if (marioSide == true) {
                alert("Great Job!");
            } else {
                alert("Wrong Side");
            }
            return marioCreation();
        }
        if (event.keyCode === 39) {
            if (marioSide == false) {
                alert("Great Job!");
            } else {
                alert("Wrong Side");
            }
            return marioCreation();
        }
    };

    // useEffect(() => {
    //     var interval = setInterval(async () => {
    //         if (showMario == true && BoardMeasrment.width != undefined) {

    //             setMarioCords({
    //                 ...marioCords,
    //                 x: 100
    //             })
    //             console.log(marioCords.y);
    //             if (marioCords.y > 380) {
    //                 marioCreation();
    //             } else {
    //                 setMarioCords({
    //                     ...marioCords,
    //                     y: marioCords.y + 10,
    //                 });
    //             }
    //         }
    //     }, 100);
    //     return () => clearInterval(interval);
    // }, [marioCords, BoardMeasrment]);

    useEffect(() => {
        /* increase marios from top to bottom if bottom == 500px then make 0 */
        const interval = setInterval(() => {
            // clearInterval(interval)
            if (marioCords.y === 500) {
                setMarioCords({
                    ...marioCords,
                    y: 0,
                })
            }
            setMarioCords({
                ...marioCords,
                x: tunnelOneCords.y ? tunnelOneCords.x : marioCords.x,
                y: marioCords.y > 440 ? 0 : marioCords.y + 10,
            })
        }, 100)
        return () => clearInterval(interval)
    }, [marioCords])
    return (
        <div
            className="relative  col-span-2 bg-green-400  w-full md:h-[502px]"
            ref={leftContainerRef}
            style={{
                backgroundImage: "url(https://researchone-game.vercel.app/images/bg2.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute flex justify-around bottom-0 left-0 right-0">
                <Tunnel xaxis={tunnelOneCords.x} yaxis={tunnelOneCords.y} />
                <Tunnel xaxis={tunnelTwoCords.x} yaxis={tunnelTwoCords.y} />
            </div>
            <Stopwatch isRunning={isRunning} milliseconds={milliseconds} setMilliseconds={setMilliseconds} />
            {showMario && (BoardMeasrment.width != undefined) && (
                <MarioPlayer
                    xaxis={marioCords.x}
                    yaxis={marioCords.y}
                />
            )}
        </div>
    );
};

export default LevelTwo;
