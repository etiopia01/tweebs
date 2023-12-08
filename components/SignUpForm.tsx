import {  useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { validateEmail } from "./utils"

export default function SignUpForm () {



    const supabase = useSupabaseClient()
    const [userData, setUserData] = useState({username:"", email:"", password:""})
    const [emailError, setEmailError] = useState<string | null>(null)

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
        setUserData(prev=> ({...prev, [e.target.name]: e.target.value}))
    }


    const handleSubmit = async ()=> {

       if( validateEmail(userData.email) ) {

        
        try {
        const { data , error } = await supabase.auth.signUp(
            {
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        username: userData.username
                    }
                }
            }
        )
        alert("check your email for confirmation")
        setUserData({username:"", email:"", password:""})
        setEmailError(null)
        }
        catch(error) {
            alert(error)
        }
    }
    else setEmailError("email not valid")

    }


    return (
        <>
        <div onClick={()=> setEmailError(null)} className="flex flex-col w-auto gap-2 mt-2">
            <input className="outline-none border bg-inherit px-2 py-1 text-slate-300 placeholder:text-sm" type="text" name="username" value={userData.username} placeholder="Select username" onChange={handleChange}/>
            <input className="outline-none border bg-inherit px-2 py-1 text-slate-300 placeholder:text-sm" type="text" name="email"value={userData.email} placeholder="Enter your email" onChange={handleChange}/>
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
            <input className="outline-none border bg-inherit px-2 py-1 text-slate-300 placeholder:text-sm" type="password" name="password" value={userData.password} placeholder="Choose password" onChange={handleChange}/>
        </div>
            <button className="bg-slate-200 rounded-xl py-1 px-2 mt-2 text-slate-800 hover:bg-inherit hover:text-slate-300 hover: border hover:border-slate-200 w-48" disabled={!userData.email || !userData.password || !userData.username} onClick={handleSubmit}>Create Account</button>
        </>
    )
}