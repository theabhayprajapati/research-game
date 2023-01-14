const randomNumberBW = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const customRandomNumber = () => {
    if (window.location.hostname !== 'localhost') {
        return randomNumberBW(2500, 8000);
    } else {
        return randomNumberBW(0, 0);
    }
}
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const generateRandomBooleanState = () => {
    return Math.random() >= 0.5;
};

export { randomNumberBW, sleep, generateRandomBooleanState, customRandomNumber };

