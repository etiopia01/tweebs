import { useState } from "react";
import { Tweeb } from "./types";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function NewTweeb({add}:{add: ()=> void}) {

    const session = useSession()
    const supabase = useSupabaseClient()
    const [tweeb, setTweeb] = useState<Tweeb>({})

    const handleChange = (e)=> {
       if(e.target.name === "content") {
        setTweeb((prev)=> ({...prev, content: e.target.value}))
       }
       else if(e.target.name === "title") {
        setTweeb((prev)=> ({...prev, title: e.target.value}))
       }
       else if(e.target.name === "topic") {
        setTweeb((prev)=> ({...prev, topic: e.target.value}))
       }
       return

    }

    const handlePublish = async ()=> {
       
       const { data , error } = await supabase
        .from("tweeebs")
        .insert({ title: tweeb.title, topic: tweeb.topic, content: tweeb.content, author: session?.user.user_metadata.name })
        .select()
        
        
        setTweeb(prev => ({...prev, content:"", title: "", topic:""}))
        add()
    }

return (
    <div className="flex flex-col justify-between items-start gap-2 w-full">
        <input className="w-full border px-4 py-2" type="text" name="title" id="title" value={tweeb.title} onChange={handleChange} placeholder="Your title..."/>
        <input className="w-full border px-4 py-2" type="text" name="topic" id="topic" value={tweeb.topic} onChange={handleChange} placeholder="What do you want to talk about?"/>
        <input  className="w-full border px-4 py-2 h-20 text-start" type="text" name="content" value={tweeb.content} onChange={handleChange} placeholder="Your take on it.." />
        <button className="text-center px-4 py-2 bg-slate-700 text-white cursor-pointer" onClick={handlePublish}>Publish Tweeb</button>
    </div>
)
}