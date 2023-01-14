/* 
// TODO: 1st - Close the timer when the hit the tunnel end || user presses < > keys
// TODO: 2nd - Recored the scores.
*/


import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { INITAL_MARIO_CORDS, INITAL_TUNNEL_CORDS, LEFTKEYCODE, MARIO_WIDTH, RIGHTKEYCODE, TUNNEL_HEIGHT, TUNNEL_WIDTH } from '../../../globals/constants';
import { customRandomNumber, generateRandomBooleanState, sleep } from '../../../globals/methods';
import { MarioPlayer } from '../../characters/Mario.character';
import Tunnel from '../../characters/Tunnel';
import Message from '../Message';
import { Stopwatch } from '../Stopwatch';
const debug = (message: any) => console.log(`[TwoTunnelLevel.tsx]`, message);

type Side = 'left' | 'right';
let interval: any;
const TwoTunnelLevel = () => {
    const [showMario, setShowMario] = useState(false);
    const [tunnelOneCords, setTunnelOneCords] = useState(INITAL_TUNNEL_CORDS);
    const [tunnelTwoCords, setTunnelTwoCords] = useState(INITAL_TUNNEL_CORDS);
    const [marioCords, setMarioCords] = useState(INITAL_MARIO_CORDS);
    const [isRunning, setIsRunning] = useState(false);
    const [marioSide, setMarioSide] = useState<Side>('left');
    const [currentSide, setCurrentSide] = useState<Side>('left');
    const [milliseconds, setMilliseconds] = useState(0);
    const leftContainerRef = useRef(null);
    const marioRef = useRef(null);
    const { updateDoubleReactionTestScores } = useAppContext();
    useEffect(() => {
        setIsRunning(true);
        const { height, width } = leftContainerRef.current.getBoundingClientRect();
        setTunnelOneCords({
            x: ((width / 2) / 2) - TUNNEL_WIDTH / 2,
            y: height - TUNNEL_HEIGHT,
        });
        setTunnelTwoCords({
            x: ((width / 2) * 1.5) - (TUNNEL_WIDTH / 2),
            y: height - TUNNEL_HEIGHT,
        });
        var side = generateRandomBooleanState();
        setShowMario(true);
        setMarioSide(side == true ? 'left' : 'right');
        sleep(customRandomNumber()).then(() => {
            console.log(width);
            var marioXaxisLeft = (((width / 2) / 2) - MARIO_WIDTH / 2);
            var marioXaxisRight = (((width / 2) * 1.5) - MARIO_WIDTH / 2);
            console.log({
                side, marioSide, currentSide
            });
            setMarioCords({
                y: 0,
                x: side == true ? marioXaxisLeft : marioXaxisRight,
            })
        });
    }, [leftContainerRef]);
    const getMarioSide = () => {
        const { width } = leftContainerRef.current.getBoundingClientRect();
        const { x } = marioRef.current.getBoundingClientRect();
        if (x < (width / 2)) {
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleClickRemoveMario);
        return () => {
            document.removeEventListener("keydown", handleClickRemoveMario);
        };
    }, []);
    const handleClickRemoveMario = (event) => {
        switch (event.keyCode) {
            case LEFTKEYCODE:
                handleLeftKey(event);
                break;
            case RIGHTKEYCODE:
                handleRightKey(event);
                break;
            default:
                break;
        };
    };

    const handleLeftKey = (event) => {
        const { width } = leftContainerRef.current.getBoundingClientRect();
        setIsRunning(false);
        setShowMario(false);
        console.log(milliseconds + "left" + document.getElementById("stopwatch").innerText);
        updateDoubleReactionTestScores(Number.parseInt(document.getElementById("stopwatch").innerText));
        debug({ key: event.keyCode, LEFTKEYCODE, marioSide });
        let marioCurrentSide = getMarioSide() ? 'left' : 'right';
        setMilliseconds(0);
        clearInterval(interval);
        setTimeout(() => {
            const marioXaxisLeft = (((width / 2) / 2) - MARIO_WIDTH / 2);
            const marioXaxisRight = (((width / 2) * 1.5) - MARIO_WIDTH / 2);
            const side = generateRandomBooleanState();
            debug(side);
            setMarioCords({
                y: 0,
                x: side === true ? marioXaxisLeft : marioXaxisRight,
            });
            setIsRunning(true);
            setShowMario(true);
            debug(marioCords);
        }, customRandomNumber());

    };


    const handleRightKey = (event) => {
        const { width } = leftContainerRef.current.getBoundingClientRect();
        setShowMario(false);
        setIsRunning(false);
        updateDoubleReactionTestScores(Number.parseInt(document.getElementById("stopwatch").innerText));
        debug({ key: event.keyCode, RIGHTKEYCODE, marioSide });
        let marioCurrentSide = getMarioSide() ? 'left' : 'right';
        setMilliseconds(0);
        clearInterval(interval);
        setTimeout(() => {
            const marioXaxisLeft = (((width / 2) / 2) - MARIO_WIDTH / 2);
            const marioXaxisRight = (((width / 2) * 1.5) - MARIO_WIDTH / 2);
            const side = generateRandomBooleanState();
            debug(side);
            setMarioCords({
                y: 0,
                x: side === true ? marioXaxisLeft : marioXaxisRight,
            });
            setIsRunning(true);
            setShowMario(true);
            debug(marioCords);
        }, customRandomNumber());
    };
    useEffect(() => {
        /* increase marios from top to bottom if bottom == 500px then make 0 */
        interval = setInterval(() => {
            console.log(marioCords);
            /* use marioRef to get the x and y position and increase it */
            const { height } = leftContainerRef.current.getBoundingClientRect();
            const { y } = marioRef.current?.getBoundingClientRect() || 0;
            if (y >= (440)) {
                console.log("Milliseconds: ", milliseconds);
                setShowMario(false);
                setMilliseconds(0);
                setIsRunning(false);
                clearInterval(interval);
                setTimeout(() => {
                    const { width } = leftContainerRef.current.getBoundingClientRect();
                    const marioXaxisLeft = (((width / 2) / 2) - MARIO_WIDTH / 2);
                    const marioXaxisRight = (((width / 2) * 1.5) - MARIO_WIDTH / 2);
                    const side = generateRandomBooleanState();
                    debug(side);
                    setMarioCords({
                        y: 0,
                        x: side === true ? marioXaxisLeft : marioXaxisRight,
                    });
                    setShowMario(true);
                    setMilliseconds(0);
                    setIsRunning(true);
                }, customRandomNumber());
            } else {
                /* if mario is less than 5 show false */
                if (marioCords.y < 10) {
                    setShowMario(false);
                } else {
                    setShowMario(true);
                }
                setMarioCords({
                    y: marioCords.y + 10,
                    x: marioCords.x,
                });
            }
        }, 100)
        return () => clearInterval(interval);
    }, [marioCords]);

    return (
        <div
            className="relative  col-span-2 bg-green-400  w-full md:h-[502px]"
            ref={leftContainerRef}
            style={{
                backgroundImage: "url(https://researchone-game.vercel.app/images/bg2.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: -1,
                /* light green color over the image */
                backgroundColor: marioSide ? "red" : "blue",
            }}
        >

            <Message>
                Use <kbd>{'<'}</kbd> and <kbd>{'>'}</kbd> to catch the <span className="text-red-800">Mario</span> for that side.
            </Message>
            <div className="absolute flex justify-around bottom-0 left-0 right-0">
                <Tunnel xaxis={tunnelOneCords.x} yaxis={tunnelOneCords.y} />
                <Tunnel xaxis={tunnelTwoCords.x} yaxis={tunnelTwoCords.y} />
            </div>
            <div className="absolute flex justify-around bottom-0 left-0 right-0">
                {
                    marioSide ? (
                        <p>
                            <span className="text-2xl text-white">Left</span>
                        </p>
                    ) : (
                        <p>
                            <span className="text-2xl text-white">Right</span>
                        </p>
                    )
                }
            </div>
            <Stopwatch isRunning={isRunning} milliseconds={milliseconds} setMilliseconds={setMilliseconds} />
            {showMario && (
                <MarioPlayer
                    marioRef={marioRef}
                    xaxis={marioCords.x}
                    yaxis={marioCords.y}
                />
            )}
        </div>
    )
}

export default TwoTunnelLevel