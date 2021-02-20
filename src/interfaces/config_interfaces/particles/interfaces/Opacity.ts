interface Anim {
    enable: boolean,
    speed: number,
    opacity_min: number,
    sync: boolean
}

export interface Opacity {
    value: number,
    random: boolean,
    anim: Anim
}