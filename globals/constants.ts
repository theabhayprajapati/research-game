import { randomNumberBW } from "./methods";

export const INITAL_MARIO_CORDS = {
    x: 0,
    y: 0,
};
export const INITAL_TUNNEL_CORDS = {
    x: 0,
    y: 0,
};
export const INITAIL_BOARD_SIZE = {
    height: undefined,
    width: undefined,
};
export const MARIO_WIDTH = 50;
export const MARIO_HEIGHT = 50;
export const TUNNEL_WIDTH = 64;
export const TUNNEL_HEIGHT = 128;

type boardSizeT = {
    height: number | undefined;
    width: number | undefined;
};

export const boardSize = {
    height: 500,
    width: 680,
}
export const LEFTKEYCODE = 37;
export const RIGHTKEYCODE = 39;
export const SPACEKEYCODE = 32;
export var pause = randomNumberBW(2000, 1000);