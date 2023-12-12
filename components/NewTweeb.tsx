import { useState } from "react";
import { Tweeb } from "./types";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function NewTweeb({add}:{add: ()=> void}) {

    
    const session = useSession()
    
    const supabase = useSupabaseClient()
    const [uploads, setUploads] = useState<string[]>()
    const [tweeb, setTweeb] = useState<Tweeb >({
        title: "",
        content: "",
        author: "",
        author_avatar:"",
        topic: "",
        id: 0,
        created_at:""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
       
        setTweeb((prev)=> ({...prev, [e.target.name]: e.target.value}))
      

    }

    const handlePublish = async ()=> {
       
       const { data , error } = await supabase
        .from("tweeebs")
        .insert({ title: tweeb.title, topic: tweeb.topic, content: tweeb.content, author: session?.user.user_metadata.name , author_avatar: session?.user.user_metadata.avatar_url, uploads:uploads})
        .select()
        
        
        setTweeb(prev => ({...prev, content:"", title: "", topic:""}))
        setUploads(undefined)
        add()
    }

    const addFiles = (e:React.ChangeEvent<HTMLInputElement>)=> {
        const files = e.target.files
       if(files) {
        for (const file of files) {
            supabase.storage.from("files")
            .upload(file.name, file)
            .then(result => {
                if(result.data) {
                    const url = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/files/" + result.data.path
                    setUploads(prev=> prev? [...prev, url] : [url])
                    
                }
                
            })
        }
       }
       

    }
return (
    <div className="flex flex-col justify-between items-start gap-2 w-full">
        <input className="w-full border px-4 py-2 outline-none text-slate-200 bg-slate-900 border-none" type="text" name="title" id="title" value={tweeb.title} onChange={handleChange} placeholder="Your title..."/>
        <input className="w-full border px-4 py-2 outline-none  text-slate-200 bg-slate-900 border-none" type="text" name="topic" id="topic" value={tweeb.topic} onChange={handleChange} placeholder="What do you want to talk about?"/>
        <input  className="w-full border px-4 py-2 h-20 outline-none  text-slate-200 bg-slate-900 border-none" type="text" name="content" value={tweeb.content} onChange={handleChange} placeholder="Your take on it.." />
        {uploads && <div className="flex gap-3 px-4">
            {uploads.map((file,index)=> <img key={index} className="w-12 h-12" src={file}/>)}
            <button onClick={()=>setUploads(undefined)} className="text-xs text-slate-500 ml-auto">x</button>
        </div>}
        <div className="w-full flex gap-4 items-center px-6">
            <label>
                <span className="text-sm text-slate-300 cursor-pointer">Photos</span>
            <input type="file" className="hidden" multiple onChange={addFiles}/>
            </label>
        <button className="text-center px-4 py-2 border-2 border-slate-200 text-white cursor-pointer ml-auto hover:bg-slate-200 hover:text-slate-800 hover:font-semibold rounded-xl" onClick={handlePublish} disabled={!tweeb.content}>Publish Tweeb</button>
        </div>
    </div>
)
}