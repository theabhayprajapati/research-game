
/* props 1. children */
type Props = {
    children: React.ReactNode;
}
const Message = ({ children }) => {
    return (
        <p
            className="absolute top-0 left-0 right-0 text-center text-white font-bold text-base border"
            style={{
                zIndex: -1,
                marginRight: "100px",
                marginLeft: "100px",
                marginTop: "10px",
            }}
        >
            {children}
        </p>
    )
}

export default Message