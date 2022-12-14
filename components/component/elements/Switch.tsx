
const Switch = () => {
    return (
        <div className="form-check form-switch mb-4 flex items-center">
            <input
                className="absolute z-10 h-5 w-8 cursor-pointer opacity-0"
                data-attribute="toggle"
                id="remember"
            />
            <div className="form-check-input"></div>
            <label
                className="form-check-label mb-0 ml-2 cursor-pointer select-none"
                htmlFor="remember">
                Remember me
            </label>
        </div>
    )
}

export default Switch