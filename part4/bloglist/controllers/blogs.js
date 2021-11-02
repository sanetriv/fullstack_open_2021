const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if(!blog.url && !blog.title){
    response.sendStatus(400)
    return
  }
  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    author: body.author,
    url: body.url,
    title: body.title,
    likes: body.likes ? body.likes : 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if(updatedBlog){
    response.json(updatedBlog.toJSON())
  }
  response.status(400).end()
})

module.exports = blogsRouter