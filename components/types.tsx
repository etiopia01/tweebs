export type Tweeb = {
    title: string
    content: string
    likes?: number
    user: {
        id: any
        name: string
        pic: string
    }
    about: string
}