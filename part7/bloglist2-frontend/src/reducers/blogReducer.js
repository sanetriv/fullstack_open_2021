import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG':
    return state.map(x => x.id===action.data.id ? { ...action.data, likes: action.data.likes + 1 } : x)
  case 'DELETE_BLOG':
    return state.filter(x => x.id !== action.data.id)
  case 'COMMENT_BLOG':
    return state.map(x => x.id===action.data.blog.id ? { ...x, comments: action.data.blog.comments.concat(action.data.comment) } : x)
  default:
    return state
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    const newBlog = await blogService.createNewBlog(title, author, url)
    console.log('ASD')
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.updateLikes(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: blog
    })
  }
}

export const delBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export const commentOnBlog = (blog, comment) => {
  return async dispatch => {
    await blogService.addComment(blog, comment)
    dispatch({
      type: 'COMMENT_BLOG',
      data: {
        blog: blog,
        comment: comment
      }
    })
  }
}

export default blogReducer