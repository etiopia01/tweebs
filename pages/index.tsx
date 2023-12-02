import NewTweeb from "@/components/NewTweeb"
import { useState } from "react"
import { Tweeb } from "@/components/types"
import TweebList from "@/components/TweebList"
import { useSession } from "@supabase/auth-helpers-react"
import LoginPage from "@/components/LoginPage"
import SideNav from "@/components/SideNav"


export default function Home() {
  const session = useSession()
  const [tweebs, setTweebs] = useState<Tweeb[]>([])
  console.log(session)
  

  const AddNew = (tweeb: Tweeb)=> {
    setTweebs(prev=> prev.concat(tweeb))
  }

  if (!session) {
    return <LoginPage/>
  }
  else {
  return (
    <div className="h-[100vh] flex flex-col gap-10 pl-32 pr-10 py-6 w-full relative bg-slate-950 text-slate-200">
      <header className="sticky top-0 flex justify-between px-6 py-4">
        <h1 className="font-extrabold text-4xl">TWeeebs</h1>
      </header>
      <NewTweeb AddNew= {AddNew}/>
      <TweebList tweebs={tweebs}/>
      <SideNav/>
      
    </div>
  )
  }
}
