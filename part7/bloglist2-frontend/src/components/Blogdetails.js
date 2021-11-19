import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { commentOnBlog, likeBlog } from '../reducers/blogReducer'
import { Button, Input, Form, List } from 'antd'

const Blogdetails = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id===id)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const updateLikes = async (blogToUpdate) => {
    try{
      dispatch(likeBlog(blogToUpdate))
    }catch(exception){
      return
    }
  }

  const addComment = async (value) => {
    try{
      dispatch(commentOnBlog(blog, value.comment))
      form.resetFields()
    }catch(exception){
      return
    }
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={`${blog.url}`}>{blog.url}</a><br></br>
      {blog.likes} likes <Button type='default' onClick={() => updateLikes(blog)}>like</Button><br></br>
      added by {blog.user.username}
      <br></br>
      <br></br>
      <h3>comments</h3>
      <Form form={form} layout="inline" onFinish={addComment}>
        <Form.Item name='comment'><Input /></Form.Item>
        <Form.Item><Button type='default' htmlType='submit'>add comment</Button></Form.Item>
      </Form>
      <List size='small' dataSource={blog.comments} renderItem={item => <List.Item>{item}</List.Item>}/>
    </div>
  )
}

export default Blogdetails