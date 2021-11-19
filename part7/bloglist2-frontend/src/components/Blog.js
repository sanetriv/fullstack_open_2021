import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //console.log(user, blog.user)
  //const [showDetails, setShowDetails] = useState(false)
  //const [showRemove] = useState(user.username===blog.user.username)
  //const detailsVisible = { display: showDetails ? '' : 'none' }
  //const removeVisible = { display: showRemove ? '' : 'none' }
  /*const likeBlog = () => {
    updateLikes(blog)
  }
  const removeBlog = () => {
    deleteBlog(blog)
  }*/

  return(
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}, {blog.author}</Link>
      {/*<div>
        {blog.title} <button onClick={() => setShowDetails(!showDetails)} className='viewHide'>{showDetails?'hide':'view'}</button>
      </div>
      <div style={detailsVisible} className='details'>
        {blog.url}<br></br>
        likes {blog.likes} <button onClick={likeBlog} className='likeButton'>like</button><br></br>
        {blog.author}<br></br>
        <div style={removeVisible}>
          <button onClick={removeBlog} id='removeBlogButton'>remove</button>
        </div>
      </div>*/}
    </div>
  )
}

export default Blog