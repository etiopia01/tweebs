import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import SignUpForm from "./SignUpForm"
import SignInForm from "./SignInForm"

export default function LoginPage() {

    const [showSingUp, setShowSignUp] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)

    const supabase = useSupabaseClient()
    async function LoginWithGoogle(){
       await supabase.auth.signInWithOAuth( 
        { provider : "google"})

    }
    
    return (
        <div className="h-[100vh] w-full flex flex-col justify-center items-center gap-20 bg-slate-950 text-slate-200">
            <div className="flex flex-col ">
            <h1 className="text-3xl">TWeeebs</h1>
            <h3 className="text-lg text-slate-400">A manga and anime hub</h3>
            </div>
            <div className="flex flex-col items-center gap-3">
            <button className="bg-slate-400 rounded-md px-4 py-2 w-52" onClick={LoginWithGoogle}>Login with Google</button>
            <p>Or</p>
            {!showSignIn? <button className="bg-lime-700 rounded-md px-4 py-2 w-52" onClick={()=>{setShowSignIn(true),setShowSignUp(false)}}>Sign In</button> : <SignInForm/>}
            {!showSingUp? <button className="bg-blue-600 rounded-md px-4 py-2 w-52" onClick={()=>{setShowSignUp(true),setShowSignIn(false)}}>Sign Up</button> : <SignUpForm/>}

            </div>
        </div>
    )
}