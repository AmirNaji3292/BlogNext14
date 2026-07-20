import Image from "next/image"

export const metadata = {
   title: "Contact us |Next App",
   description: "contact us | next app",
 };
 

function Contact() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 ">
      <div>
         <Image alt="contact" src="/contact.png" height={500} width={500}/>
      </div>

      <div className=" flex w-[470px] rounded-lg">
         <div className="w-full flex justify-center">
            <form className="w-full">
              <div className="w-full p-5">
                 <input className="w-[90%] p-2 rounded-[8px] outline-none" placeholder="Enter name or surname"/>
              </div>

              <div className="w-full p-5">
                 <input  className="w-[90%] p-2 rounded-[8px] outline-none" placeholder="Enter emailadress"/>
              </div>

              <div className="w-full p-5">
                 <input className="w-[90%] p-2 rounded-[8px] outline-none" placeholder="Phone number(optional)"/>
              </div>

              <div className="w-full p-5">
                 <textarea className="w-[90%] p-2 h-[140px] rounded-[8px] outline-none" placeholder="Message"/>
              </div>
              <div className="w-full p-5">
                  <button className="w-[90%] bg-blue-600 text-white rounded-[8px] py-3">send</button>
              </div>
            </form>
         </div>
      </div>
    </div>
  )
}

export default Contact