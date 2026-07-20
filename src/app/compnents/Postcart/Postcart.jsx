import Image from "next/image";
import Link from "next/link";

function Postcart({ post }) {
  return (
    <div className="w-full max-w-[400px] bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">

      {/* Image */}
      <div className="relative w-full h-[260px] overflow-hidden">
        {post.img && (
          <Image
            src={post.img}
            alt={post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Date badge */}
        <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
          {post.date}
        </div>
      </div>


      {/* Content */}
      <div className="p-6 text-white">

        <h2 className="text-2xl font-bold mb-3 line-clamp-1">
          {post.title}
        </h2>

        <p className="text-gray-300 leading-6 line-clamp-3">
          {post.description}
        </p>


        <Link
          href={`/blog/${post.slug}`}
          className="inline-block mt-5 text-sky-400 border-b border-sky-400 hover:text-sky-300 transition"
        >
          Read more →
        </Link>

      </div>

    </div>
  );
}

export default Postcart;


















// import Image from 'next/image'
// import Link from 'next/link'


// function Postcart({post}) {


//   return (
//     <div className='max-w-[400px] bg-red-100 rounded-md py-2'>
//         <div className='flex text-white justify-center relative py-4'>
           
//              <div className='bg-red-100 max-h-[400px] overflow-hidden '>

//             {post.img &&<Image src={post.img} width={300} height={300} 
//              className='rounded-[4px] p-4 object-cover'/>}
//              </div>
          
//             <p className='rotate-90 p-0 m-0 text-[14px] absolute top-[40%] 
//             right-[-30px] 
//              '>{post.date}</p>
//         </div>
//         <div className=' pl-8' >
//             <p className='font-semibold text-2xl'>{post.title}</p>
//             <p className='max-h-[160px] '>{post.description}</p>

//             <p className='mt-4 '>
//                 <Link className='border-b-2' href={`/blog/${post.slug}`}>Read 
//                  more</Link>
//             </p>
//         </div>
//     </div>
//   )
// }

// export default Postcart