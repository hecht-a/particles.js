import { DivStyle } from "./config_interfaces/div_style/DivStyle";
import { Interactivity } from "./config_interfaces/interactivity/Interactivity";
import { Particles } from "./config_interfaces/particles/Particles";

export interface Config {
    particles: Particles,
    interactivity: Interactivity,
    retina_detect: boolean,
    divStyle: DivStyle
}