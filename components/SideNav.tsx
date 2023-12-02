import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import Link from "next/link"
import User from "./User"

export default function SideNav() {

    async function signOut() {
        await supabase.auth.signOut()
    }

    const session = useSession()
    const supabase = useSupabaseClient()
    return (
        <div className="absolute left-0 top-0 flex flex-col justify-start items-start gap-4 p-4 w-20 border-r border-slate-500 h-full">
            <Link href={"/"}><button>Home</button></Link>
            {session && <User name={session.user.user_metadata.name} pic={session.user.user_metadata.picture}/> }
            {session? <button onClick={signOut}>Logout</button> : <Link href={"/login"}><button>Login</button></Link>}

        </div>
    )
}