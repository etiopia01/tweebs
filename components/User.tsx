import Image from "next/image"
export default function User({name, pic}: {name:string, pic:string}) {
    return (
        
            <Image width="40" height="40" src={pic} className="h-10 w-10 rounded-full"  alt="profile picture" />
            
        
    )
}