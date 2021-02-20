import { Color } from './interfaces/Color';
import { lineLinked } from './interfaces/lineLinked';
import { Move } from './interfaces/Move';
import { Number } from './interfaces/Number'
import { Opacity } from './interfaces/Opacity';
import { Shape } from './interfaces/Shape';
import { Size } from './interfaces/Size';

export interface Particles {
    number: Number,
    color: Color,
    shape: Shape,
    opacity: Opacity,
    size: Size,
    line_linked: lineLinked,
    move: Move
}
