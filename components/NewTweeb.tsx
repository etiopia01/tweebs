import { useState } from "react";
import { Tweeb } from "./types";

export default function NewTweeb({AddNew}:{AddNew: (tweeb: Tweeb)=> void}) {

    const [tweeb, setTweeb] = useState<Tweeb>({})

    const handleChange = (e)=> {
       if(e.target.name === "content") {
        setTweeb((prev)=> ({...prev, content: e.target.value}))
       }
       else if(e.target.name === "title") {
        setTweeb((prev)=> ({...prev, title: e.target.value}))
       }
       else if(e.target.name === "topic") {
        setTweeb((prev)=> ({...prev, about: e.target.value}))
       }
       return

    }

    const handlePublish = (tweeb: Tweeb)=> {
        AddNew(tweeb)
        setTweeb(prev => ({...prev, content:"", title: "", about:""}))
    }

return (
    <div className="flex flex-col justify-between items-start gap-2 w-full">
        <input className="w-full border px-4 py-2" type="text" name="title" id="title" value={tweeb.title} onChange={handleChange} placeholder="Your title..."/>
        <input className="w-full border px-4 py-2" type="text" name="topic" id="topic" value={tweeb.about} onChange={handleChange} placeholder="What do you want to talk about?"/>
        <input  className="w-full border px-4 py-2 h-20 text-start" type="text" name="content" value={tweeb.content} onChange={handleChange} placeholder="Your take on it.." />
        <button className="text-center px-4 py-2 bg-slate-700 text-white cursor-pointer" onClick={()=>handlePublish(tweeb)}>Publish Tweeb</button>
    </div>
)
}