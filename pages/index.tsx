import NewTweeb from "@/components/NewTweeb"
import { useState } from "react"
import { Tweeb } from "@/components/types"
import TweebList from "@/components/TweebList"
export default function Home() {
  
  const [tweebs, setTweebs] = useState<Tweeb[]>([])

  const AddNew = (tweeb: Tweeb)=> {
    setTweebs(prev=> prev.concat(tweeb))
  }

  return (
    <div className="h-full flex flex-col gap-10 px-10 py-6 w-full">
      <header className="sticky top-0 flex justify-between px-6 py-4">
        <h1 className="font-extrabold text-4xl">TWeeebs</h1>
      </header>
      <NewTweeb AddNew= {AddNew}/>
      <TweebList tweebs={tweebs}/>
    </div>
  )
}
