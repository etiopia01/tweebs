import { InputHTMLAttributes, useState } from "react";
import { Tweeb } from "./types";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function NewTweeb({add}:{add: ()=> void}) {

    
    const session = useSession()
    console.log(session)
    const supabase = useSupabaseClient()
    const [tweeb, setTweeb] = useState<Tweeb >({
        title: "",
        content: "",
        author: "",
        author_avatar:"",
        topic: "",
        id: 0
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
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
        .insert({ title: tweeb.title, topic: tweeb.topic, content: tweeb.content, author: session?.user.user_metadata.name , author_avatar: session?.user.user_metadata.avatar_url})
        .select()
        
        
        setTweeb(prev => ({...prev, content:"", title: "", topic:""}))
        add()
    }

return (
    <div className="flex flex-col justify-between items-start gap-2 w-full">
        <input className="w-full border px-4 py-2 outline-none text-slate-200 bg-slate-900 border-none" type="text" name="title" id="title" value={tweeb.title} onChange={handleChange} placeholder="Your title..."/>
        <input className="w-full border px-4 py-2 outline-none  text-slate-200 bg-slate-900 border-none" type="text" name="topic" id="topic" value={tweeb.topic} onChange={handleChange} placeholder="What do you want to talk about?"/>
        <input  className="w-full border px-4 py-2 h-20 outline-none  text-slate-200 bg-slate-900 border-none" type="text" name="content" value={tweeb.content} onChange={handleChange} placeholder="Your take on it.." />
        <button className="text-center px-4 py-2 border-2 border-slate-200 text-white cursor-pointer ml-auto hover:bg-slate-200 hover:text-slate-800 hover:font-semibold rounded-xl" onClick={handlePublish} disabled={!tweeb.content}>Publish Tweeb</button>
    </div>
)
}