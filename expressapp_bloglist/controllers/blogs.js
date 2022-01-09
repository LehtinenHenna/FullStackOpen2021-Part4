const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

// gets all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')

  response.json(blogs.map(blog => blog.toJSON()))
})

// posts a new blog
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const users = await User.find({})
  const user = users[0]
  console.log('user: ', users)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  if (!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

// modifies an existing blog
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

// deletes a blog by id
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter