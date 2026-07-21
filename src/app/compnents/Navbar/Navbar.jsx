import { auth } from "@/lib/auth"
import Links from "./Links"

async function Navbar() {

  const session=await auth()
  return (
    <div className="flex justify-around ">

        <div className="text-white text-[30px] font-bold italic mt-3">
           
             Blog App
            
        </div>
        <div className="text-white gap-8 mt-4 max-h-[200px] ">
        <Links 
              session={session}
              isAdmin={isAdmin}
             />

        </div>
    </div>
  )
}

export default Navbar