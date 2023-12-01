import { Tweeb } from "./types"
import TweebCard from "./TweebCard"

export default function TweebList ({tweebs}:{tweebs:Tweeb[]}) {
    return (
        <div>
            {tweebs.map(tweeb=> <TweebCard tweeb={tweeb}/> )}
        </div>
    )
}