import { Tweeb } from "./types";
import { useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
;

export default function TweebCard ({tweeb, remove}: {tweeb: Tweeb, remove:(id:number) => void}) {
    
    const session = useSession()
    const supabase = useSupabaseClient()
   

    const handleDelete = async ()=> {
        const { data, error } = await supabase
        .from("tweeebs")
        .delete()
        .eq( "id" , tweeb.id)
        .select()

        remove(tweeb.id)
    }
    return (
        <div className=" w-auto flex flex-col justify-between  items-start bg-slate-800 rounded-md py-2 px-6">
            <p className="text-xs  text-slate-500 mb-4">{tweeb.author} <span>writes</span></p>
            <div className="flex flex-col gap-2">
            <h1 className="text-2xl  text-slate-200">{tweeb.title}</h1>
            <h3 className="text-md  text-slate-500">{tweeb.topic}</h3>
            <p className="text-lg  text-slate-200">{tweeb.content}</p>
            </div>
            {tweeb.author === session?.user.user_metadata.name && <button className="p-1 rounded-lg bg-slate-600 ml-auto" onClick={handleDelete}>X</button>}
        </div>
    )
}