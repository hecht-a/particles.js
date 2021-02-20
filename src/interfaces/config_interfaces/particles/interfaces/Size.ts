interface Anim {
    enable: boolean,
    speed: number,
    size_min: number,
    sync: boolean
}

export interface Size {
    value: number,
    random: boolean,
    anim: Anim
}