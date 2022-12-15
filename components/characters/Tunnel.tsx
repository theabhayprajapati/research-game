type TunnelT = {
    xaxis: number;
    yaxis: number;
    styles?: {};
}
const Tunnel = ({ xaxis, yaxis, styles }: TunnelT) => {
    return (
        <div
            className="tunnel bg-black h-32 w-16"
            style={{
                backgroundImage: "url(https://researchone-game.vercel.app/images/tunnel2.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                left: xaxis,
                top: yaxis,
                ...styles,
            }}
        ></div>
    );
};

export default Tunnel;
