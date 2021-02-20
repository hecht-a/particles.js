interface OnEvent {
    enable: boolean,
    mode: string
}

export interface Events {
    onhover: OnEvent,
    onclick: OnEvent,
    resize: boolean
}