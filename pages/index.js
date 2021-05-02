import {db} from '../firebase-config/firebase'
import Link from 'next/link'
import {useState} from 'react'

export default function Home({Allblogs}) {
  const [blogs, setblogs] = useState(Allblogs)
  const [end, setend] = useState(false)
  const loadmore=async()=>{
    const last=blogs[blogs.length-1]
    const res=await db.collection('blogs')
    .orderBy('createdAt','desc')
    .startAfter(new Date(last.createdAt))
    .limit(3)
    .get()
    const newblogs= res.docs.map(docSnap=>{
      return{
        ...docSnap.data(),
        createdAt:docSnap.data().createdAt.toMillis(),
        id:docSnap.id}
    })
    setblogs(blogs.concat(newblogs))

    if(newblogs.length<3){
      setend(true)
    }
  }
  return (
    <div className="center" >
      {blogs.map(blog=>{
        return(       
        
            <div className="card" key={blog.createdAt}>
              <div className="card-image">
                <img src={blog.imageUrl}/>
                <span className="card-title">{blog.title}</span>
              </div>
              <div className="card-content">
               <p>{blog.body}</p>
               </div>
              <div className="card-action #00796b teal darken-2 ">
               <Link href={`/blogs/${blog.id}`}><a>read more</a></Link> 
              </div>
             </div>
             )
        })}
    {end==false?
        <button  className="btn " onClick={()=>loadmore()}>load more...</button>
     :<h6>you have reached the end!</h6>
    }

     <style jsx>
           {`
            .card{
              max-width:500px;
              margin:22px auto;
            }
            p{
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
           `}
        </style>
        </div>
  ) 
  }

  export async function getServerSideProps(context) {
  const querySnap= await db.collection('blogs').orderBy('createdAt','desc')
  .limit(3)
  .get()
  const Allblogs= querySnap.docs.map(docSnap=>{
    return{
   ...docSnap.data(),
   createdAt:docSnap.data().createdAt.toMillis(),
   id: docSnap.id}
    })
//  console.log(Allblogs)

    return {
      props: {Allblogs}, // will be passed to the page component as props
    }
  }
