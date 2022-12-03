import LevelTwo from "../../level/LevelTwo.level"
import RightAside from "./right/Rightcard.right"

const HomePage = () => {
    return (
        <div className="container" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: "10px",
            height: "90vh",
        }}>
            <RightAside />
            {/* <LeftContainer /> */}
            <LevelTwo />    
        </div>

    )
}

export default HomePage