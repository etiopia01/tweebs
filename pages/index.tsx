import NewTweeb from "@/components/NewTweeb"
import { useEffect, useState } from "react"
import { Tweeb } from "@/components/types"
import TweebCard from "@/components/TweebCard"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import LoginPage from "@/components/LoginPage"
import SideNav from "@/components/SideNav"



export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [error, setError] = useState<string | undefined>(undefined)
  const [tweebs, setTweebs] = useState<Tweeb[]| null>(null)
  const [add, setAdd] = useState(false)
  
  useEffect(()=> {
    async function fetchTweebs() {
      const { data , error } = await supabase
      .from("tweeebs")
      .select()

      if(error) {
        setError("Could not load tweeebs")
      }
      if(data) {
        setTweebs(data)
        setError(undefined)
        
      }
    }
    fetchTweebs()

  },[add, supabase])

  const handleRemove = (id:number) => {
    
    setTweebs(prev => (prev?.filter(tweeb=> tweeb.id !== id) || []))
    

  }

  const addTweeb = ()=> {
    setAdd(prev=> !prev)

  }

  
  if (!session) {
    return <LoginPage/>
  }
  else {
  return (
    <div className="h-[1000vh] flex flex-col gap-10 pl-32 pr-10 py-6 w-full relative bg-slate-950 text-slate-200">
      <SideNav/>
      <header className="sticky top-0 flex flex-col justify-between px-6 py-4 bg-slate-950">
        <h1 className="font-extrabold text-4xl mb-6">TWeeebs</h1>
      <NewTweeb add={addTweeb}/>
      </header>
      <div className="flex flex-col gap-4">
            {tweebs && tweebs.map(tweeb=> <TweebCard key={tweeb.id} tweeb={tweeb} remove={handleRemove}/> )}
        </div>
      {error && <p className="text-white text-lg">{error}</p>}
      
    </div>
  )
  }
}
