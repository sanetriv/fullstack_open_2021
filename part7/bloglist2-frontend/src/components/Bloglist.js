import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
//import { likeBlog, delBlog } from '../reducers/blogReducer'
//import { Link } from 'react-router-dom'


const Bloglist = () => {
  //const dispatch = useDispatch()

  /*const updateLikes = async (blogToUpdate) => {
    try{
      dispatch(likeBlog(blogToUpdate))
    }catch(exception){
      return
    }
  }*/

  /*const deleteBlog = async (blog) => {
    try{
      const del = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      if(del){
        dispatch(delBlog(blog))
      }
      return
    }catch(exception){
      return
    }
  }*/

  const blogs = useSelector(state => state.blogs)

  return(
    <div>
      {blogs.length>0 ? blogs.sort(function (a,b) { return b.likes-a.likes }).map(blog =>
        <Blog key={blog.id} blog={blog} className='aBlog'/>
        /*<Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>*/
      ):'No blogs found'}
    </div>
  )
}

export default Bloglist