interface Attract {
    enable: boolean,
    rotateX: number,
    rotateY: number
}

export interface Move {
    enable: boolean,
    speed: number,
    direction: string,
    random: boolean,
    straight: boolean,
    out_mode: string,
    bounce: boolean,
    attract: Attract
}