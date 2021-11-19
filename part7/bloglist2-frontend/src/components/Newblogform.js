import React, {  } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Form } from 'antd'

const NewBlogForm = ({ createBlog }) => {
  const [form] = Form.useForm()
  const addNewBlog = (values) => {
    createBlog(values.title, values.author, values.url)
    form.resetFields()
  }
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 7 },
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <Form {...layout} form={form} onFinish={addNewBlog}>
        <Form.Item name='title' label='title'><Input /></Form.Item>
        <Form.Item name='author' label='author'><Input /></Form.Item>
        <Form.Item name='url' label='url'><Input /></Form.Item>
        <Form.Item><Button type="primary" id='createNewButton' htmlType='submit'>create</Button></Form.Item>
      </Form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog : PropTypes.func.isRequired
}

export default NewBlogForm