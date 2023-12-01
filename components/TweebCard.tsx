import { Tweeb } from "./types";

export default function TweebCard ({tweeb}: {tweeb: Tweeb}) {
    return (
        <div>
            <h1>{tweeb.title}</h1>
            <h3>{tweeb.about}</h3>
            <p>{tweeb.content}</p>
        </div>
    )
}