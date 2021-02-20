interface Remove {
    particles_nb: number
}

interface Push {
    particles_nb: number
}

interface Repulse {
    distance: number,
    duration: number
}

interface Bubble {
    distance: number,
    size: number,
    duration: number,
    opacity: number,
    speed: number
}

interface LineLinked {
    opacity: number
}

interface Grab {
    distance: number,
    line_linked: LineLinked
}

export interface Modes {
    grab: Grab,
    bubble: Bubble,
    repulse: Repulse,
    push: Push,
    remove: Remove
}