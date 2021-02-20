import { Color } from "./config_interfaces/particles/interfaces/Color";

export interface ParticlesData {
    color: Color | string,
    opacity: number,
    radius: number,
    shape: string,
    vx: number,
    vx_i: number,
    vy: number,
    vy_i: number,
    x: number,
    y: number,
    vo?: number,
    sizeStatus?: boolean,
    vs?: number,
    opacityStatus?: boolean
}