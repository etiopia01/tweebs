import NewTweeb from "@/components/NewTweeb"
import { useState } from "react"
import { Tweeb } from "@/components/types"

export default function Home() {
  
  const [tweebs, setTweebs] = useState<Tweeb[]>([])

  const AddNew = (tweeb: Tweeb)=> {
    setTweebs(prev=> prev.concat(tweeb))
  }

  return (
    <div>
      <header className="sticky top-0 flex justify-between px-6 py-4">
        <h1>TWeeebs</h1>
      </header>
      <NewTweeb AddNew= {AddNew}/>
    </div>
  )
}
