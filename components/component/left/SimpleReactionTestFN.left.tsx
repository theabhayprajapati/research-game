import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { SPACEKEYCODE } from "../../../globals/constants";
import { randomNumberBW } from "../../../globals/methods";
import { MarioPlayer } from "../../characters/Mario.character";
import Tunnel from "../../characters/Tunnel";
import Message from "../Message";
import { Stopwatch } from "../Stopwatch";

const MARIO_WIDTH = 50;
const MARIO_HEIGHT = 50;
const TUNNEL_WIDTH = 64;
const TUNNEL_HEIGHT = 128;
type boardSizeT = {
    height: number | undefined;
    width: number | undefined;
};
var interval: any;
const pauseMoment = [0,0]
const SimpleReactionTestFN = ({ setScore }) => {
    const [tunnelCords, setTunnelCords] = useState({
        x: 0,
        y: 0,
    });
    const [marioCords, setMarioCords] = useState({
        x: 0,
        y: 0,
    });
    const [showMario, setShowMario] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [milliseconds, setMilliseconds] = useState(0);
    const { simpleReactionTestScores, updateSimpleReactionTestScores } = useAppContext();
    const [time, setTime] = useState(0);
    const leftContainerRef = useRef(null);
    const [BoardMeasrment, setBoardMeasrment] = useState<boardSizeT>({
        height: undefined,
        width: undefined,
    });
    useEffect(() => {
        setIsRunning(true);
        setShowMario(true);
        const height = leftContainerRef.current.clientHeight;
        const width = leftContainerRef.current.clientWidth;
        console.log(height, width);
        setTunnelCords({
            x: width / 2 - TUNNEL_WIDTH / 2,
            y: height - TUNNEL_HEIGHT,
        });
        setMarioCords({
            y: 0,
            x: width / 2 - MARIO_WIDTH / 2,
        });
        return console.log("leftContainerRef.current", leftContainerRef.current);
    }, [leftContainerRef]);

    useEffect(() => {
        /* increase marios from top to bottom if bottom == 500px then make 0 */
        interval = setInterval(() => {
            if (marioCords.y > 440) {
                setShowMario(false);
                setIsRunning(false);
                setMilliseconds(0);
                clearInterval(interval);
                setTimeout(() => {
                    setMarioCords({
                        ...marioCords,
                        y: 0,
                    });
                    setIsRunning(true);
                    setMilliseconds(0);
                    setShowMario(true);
                }, randomNumberBW(0,0));
            } else {
                setMarioCords({
                    ...marioCords,
                    x: tunnelCords.y ? tunnelCords.x : marioCords.x,
                    y: marioCords.y > 440 ? 0 : marioCords.y + 10,
                });
            }
        }, 100);
        return () => clearInterval(interval);
    }, [marioCords]);
    useEffect(() => {
          document.addEventListener("keydown", handleClickRemoveMario);
        return () => {
            document.removeEventListener("keydown", handleClickRemoveMario);
        };
    }, []);
    const handleClickRemoveMario = (event) => {
        if (event.keyCode === SPACEKEYCODE) {
            updateSimpleReactionTestScores(Number.parseInt(document.getElementById("stopwatch").innerText));
            setShowMario(false);
            setIsRunning(false);
            // setMilliseconds(0);
            clearInterval(interval);
            setTimeout(() => {
                console.log(leftContainerRef.current.width)
                var center = (leftContainerRef.current.width / 2) - (MARIO_WIDTH / 2);
                console.log(center);
                setMarioCords({
                    y: 0,
                    x: center,
                });
                setShowMario(true);
                setIsRunning(true);
                setMilliseconds(0);
                console.log(marioCords);
            }, randomNumberBW(0,0));
        }
    };

    return (
        <div
            className="relative col-span-2 border bg-green-400  w-full md:h-[502px]"
            ref={leftContainerRef}
            style={{
                backgroundImage:
                    "url(https://researchone-game.vercel.app/images/bg2.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: -1,
            }}
        >
            <Message>
                Press <span className="text-black">space</span> to catch{" "}
                <span className="text-red-800">Mario</span>
            </Message>
            <Tunnel
                xaxis={tunnelCords.x}
                yaxis={tunnelCords.y}
                styles={{
                    position: "absolute",
                }}
            />
            <Stopwatch
                isRunning={isRunning}
                milliseconds={milliseconds}
                setMilliseconds={setMilliseconds}
            />
            {showMario && <MarioPlayer xaxis={marioCords.x} yaxis={marioCords.y} />}
        </div>
    );
};

export default SimpleReactionTestFN;
