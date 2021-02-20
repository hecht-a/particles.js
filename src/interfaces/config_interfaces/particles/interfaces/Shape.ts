interface Stroke {
    width: number,
    color: string
}

interface Polygon {
    nb_sides: number
}

interface Image {
    src: string,
    width: number,
    height: number
}

export interface Shape {
    type: string,
    stroke: Stroke,
    polygon: Polygon,
    image: Image
}