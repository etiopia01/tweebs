import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function LoginPage() {

    const supabase = useSupabaseClient()
    async function LoginWithGoogle(){
       await supabase.auth.signInWithOAuth( 
        { provider : "google"})

    }
    return (
        <div>
            <button onClick={LoginWithGoogle}>Login with Google</button>
        </div>
    )
}