import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function LoginPage() {

    const supabase = useSupabaseClient()
    async function LoginWithGoogle(){
       await supabase.auth.signInWithOAuth( 
        { provider : "google"})

    }
    return (
        <div className="h-[100vh] w-full flex justify-center items-center bg-slate-950 text-slate-200">
            <div>
            <button onClick={LoginWithGoogle}>Login with Google</button>
            <p>Or</p>
            <button>Sign In</button>
            <button>Sign Up</button>
            </div>
        </div>
    )
}