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
    <div>
        <input type="text" name="title" id="title" value={tweeb.title} onChange={handleChange}/>
        <input type="text" name="content" value={tweeb.content} onChange={handleChange} placeholder="Your take on.." />
        <button onClick={()=>handlePublish(tweeb)}>Publish Tweeb</button>
    </div>
)
}