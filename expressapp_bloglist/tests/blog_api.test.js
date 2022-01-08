const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./blog_test_helper')
const _= require('lodash')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.listWithManyBlogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.listWithManyBlogs.length)
})


test('the blogs have a field called id', async () => {
  const response = await api.get('/api/blogs')

  _.forEach(response.body, (value) => {
    expect(value.id).toBeDefined()
  })

  // option to using _.forEach in case the database is very large: 
  // check only the first blog in the list of blogs
  /*
  const blogToInspect = response.body[0] // first blog in the list
  expect(blogToInspect.id).toBeDefined()
  */
})


test('a valid blog can be posted to the database', async () => {
  const newBlog = helper.listWithOneBlog[0]

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'Go To Statement Considered Harmful'
    )
})

test('if the number of likes is left blank it should be zero', async () => {
  const newBlog = {
    title: 'The Closet Historian',
    url: 'http://theclosethistorian.blogspot.com/',
    author: 'Bianca'
  }

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  
  const blogIndex = _.findIndex(blogsAtEnd, (blog) => blog.title === 'The Closet Historian')
  expect(blogsAtEnd[blogIndex].likes).toBe(0)
})


afterAll(() => {
  mongoose.connection.close()
})