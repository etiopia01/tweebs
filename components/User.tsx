export default function User({name, pic}: {name:string, pic:string}) {
    return (
        
            <img className="h-10 w-10 rounded-full" src={pic} alt="profile picture" />
            
        
    )
}