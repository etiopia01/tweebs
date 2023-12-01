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

    }

    const handlePublish = (tweeb: Tweeb)=> {
        AddNew(tweeb)
        setTweeb(prev => ({...prev, content:""}))
    }

return (
    <div className="flex flex-col justify-between items-start gap-6 w-full">
        <input className="w-full border px-4 py-2" type="text" name="title" id="title" value={tweeb.title} onChange={handleChange} placeholder="Your title"/>
        <input  className="w-full border px-4 py-2 h-40" type="text" name="content" value={tweeb.content} onChange={handleChange} placeholder="Your take on it.." />
        <button onClick={()=>handlePublish(tweeb)}>Publish Tweeb</button>
    </div>
)
}