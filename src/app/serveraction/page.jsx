import { addPost, deletePost } from '@/lib/action'


function serveraction() {
  return (
    <div className='bg-white'>
        <form action={addPost} className="">
          <input name='title' placeholder='title'/>
          <input name='description' placeholder='description'/>
          <input name='userId' placeholder='userId'/>
          <input name='slug' placeholder='slug'/>
            <button className='text-red-800 text-2xl'>test me</button>
        </form>

        <form action={deletePost}>
          <input placeholder='id' name='id'/>
          <button>delete post</button>
        </form>
    </div>
  )
}

export default serveraction