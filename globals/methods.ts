const randomNumberBW = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const generateRandomBooleanState = () => {
    return Math.random() >= 0.5;
};

export { randomNumberBW, sleep, generateRandomBooleanState };

