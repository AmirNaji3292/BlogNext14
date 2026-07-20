'use client'
import { LoginAction,handleLogInGithub } from "@/lib/action"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom";
import Link from 'next/link'


function LoginFormState() {
    const router=useRouter()
    const [state,formAction]=useFormState(LoginAction,undefined)

   useEffect(() => {
  if (state?.success) {
    router.push("/");
  }
}, [state, router]);
  return (

    <div className="bg-red-200">


   <div className=" bg-red-100 felx justify-center items-center rounded-lg ">
       
       <div className="w-[100%]  bg-gray-300 p-8 rounded-lg">
        <h2 className="text-2xl  ">Login Page</h2>


       <form className="p-2" action={formAction}  >
           

               <div className=" flex justify-center items-center">
                     <input className=" w-full bg-white border-2  p-2 text-lg rounded-lg m-2" type="text" name='username' placeholder="username" />
                 </div>
 
                 
 
                 <div className=" flex justify-center">
                     <input className="w-full p-2 border-2 text-xl bg-white rounded-xl m-2" type="text" name='password' placeholder="password" />
                 </div>
                 <button className=" text-xl m-2 border-2 p-1 w-full">login</button>
 
              
             </form>

               <form className="flex justify-center items-center" action={handleLogInGithub}>
                <button  className=" ml-4 font-semibold border-2 p-1 w-full">login with github</button>
              </form>

               </div>


   </div>
    <p className="text-red-800 font-semibold">   {state?.error}</p>
    <p className="text-blue-900 mt-4">have not an account ?<Link href='/register'>register</Link></p>
    </div>
    
  )
}

export default LoginFormState