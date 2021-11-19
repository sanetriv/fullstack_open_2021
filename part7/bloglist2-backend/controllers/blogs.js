const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const { nonExistingId } = require('../tests/test_helper')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    if(!(body.title && body.url)){
      return response.status(400).json({error: 'title and/or url missing'})
    }
    const user = request.user

    const blog = new Blog({
      author: body.author,
      title: body.title,
      likes: body.likes ? body.likes : 0,
      url: body.url,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())

  } catch(exception){
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const comment = request.body.comment
  if (blog) {
    const newBlog = {...blog.toJSON(), comments:blog.comments.concat(comment)}
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {returnDocument: 'after'})
    return response.status(204).json(updatedBlog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if(!blog){
      return response.status(404).json({error: 'Blog not found'})
    }
    if (blog.user.toString() === user._id.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      return response.status(204).end()
    }
    return response.status(400).json({error: 'You do not have access to that blog'})

  } catch(exception){
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try{
    const body = request.body
    const blog = await Blog.findById(request.params.id)
    if(!blog){
      return response.status(404).json({error: 'No blogs found with given id'})
    }
    const newBlog = {
      author: body.author,
      url: body.url,
      title: body.title,
      likes: body.likes + 1,
      comments: body.comments
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {returnDocument: 'after'})
    return response.status(204).json(updatedBlog.toJSON())

  } catch (exception){
    next(exception)
  }
})

module.exports = blogsRouter