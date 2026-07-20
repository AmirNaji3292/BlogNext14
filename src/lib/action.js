"use server"


import { isRedirectError } from "next/dist/client/components/redirect";
import bcrypt from 'bcryptjs'
import { signIn, signOut } from "./auth"
import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";


export const addPost = async (prevState, formData) => {
  const { title, description, slug, userId, img } =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    await new Post({
      title,
      img,
      description,
      slug,
      userId,
    }).save();

    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true };

  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};











export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDb();

    await Post.findByIdAndDelete(id);

    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};




// export const addUser = async (prevState,formData) => {
//     const { username, email, password, img } = Object.fromEntries(formData);
  
//     try {
//       connectToDb();
//       const newUser = new User({
//         username,
//         email,
//         password,
//         img,
//       });
  
//       await newUser.save();
//       console.log("saved to db");
//       revalidatePath("/admin");
//       return{success:true}

//     } catch (err) {
//       console.log(err);
//       return { error: "Something went wrong!" };
//     }
//   };



export const addUser = async (previousState, formData) => {
  const { username, email, password, img, isAdmin } =
    Object.fromEntries(formData);

  try {
    await connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "already Exist username!" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass,
      img,
      isAdmin: isAdmin === "true",
    });

    await newUser.save();

    revalidatePath("/admin");

    return { success: true };

  } catch (error) {
    console.log(error);
    return { error: "could not register!" };
  }
};


  





  export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
  
    try {
     await connectToDb();
  
      await Post.deleteMany({ userId: id });
      await User.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  





export const handleLogInGithub=async()=>{
  'use server'
  await signIn('github')
}


export const handleLogOtGithub=async()=>{
    'use server'
    await signOut()
  }



  export const Register=async(previousState, formData)=>{
    const {username, email, password , RepeatPassword,img}=Object.fromEntries(formData)
    if(password !==RepeatPassword){
        return{error:"password and RepeatPassword not match."}
    }

    try {
      await  connectToDb()
        const user=await User.findOne({username})
        if(user){
            return {error:"already Exist username!"}
        }

        const salt=await bcrypt.genSalt(10)
        const hashPass= await bcrypt.hash(password,salt)

        const newUser=new User({
            username,
            email,
            password:hashPass,
            img
        })
        await newUser.save()
        return{success:true}

    } catch (error) {
        console.log(error)
       return{error:"coudnot register!"}
    }
  }











export const LoginAction = async (previousState, formData) => {

  const { username, password } = Object.fromEntries(formData);

  try {

    await signIn("credentials", {

      username,

      password,

      redirectTo: "/",

    });

  } catch (error) {

    if (isRedirectError(error)) {

      throw error;

    }

    return {

      error: "َUsername Or Password Is Wrong..",

    };

  }

};