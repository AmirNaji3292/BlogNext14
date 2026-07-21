import { auth } from "@/lib/auth";
import Links from "./Links";
import { connectToDb } from "@/lib/utils";
import { User } from "@/lib/models";

async function Navbar() {

  const session = await auth();

  let isAdmin = false;

  if (session?.user?.email) {

    await connectToDb();

    const user = await User.findOne({
      email: session.user.email,
    });

    isAdmin = user?.isAdmin || false;
  }
// console.log("ADMIN FROM DB:", isAdmin);

  return (
    <div className="flex justify-around">

      <div className="text-white text-[30px] font-bold italic mt-3">
        Blog App
      </div>

      <div className="text-white gap-8 mt-4 max-h-[200px]">

        <Links 
          session={session}
          isAdmin={isAdmin}
        />

      </div>

    </div>
  );
}

export default Navbar;