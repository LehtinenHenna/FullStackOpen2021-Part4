const listHelper = require('../utils/list_helper')
const helper = require('./blog_test_helper')


describe('most blogs', () => {

  test('with an empty list is empty object', () => {
    const result = listHelper.mostBlogs(helper.emptyList)
    expect(result).toEqual({})
  })

  test('when a list has only one blog equals an object {author: <authorOfThatBlog>, blogs: 1}', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    expect(result).toEqual(
      {
        author:'Edsger W. Dijkstra', 
        blogs: 1
      }
    )
  })

  test('of a list of many blogs the result is an object with the author of most blogs as key and number of their blogs as value', () =>  {
    const result = listHelper.mostBlogs(helper.listWithManyBlogs)
    expect(result).toEqual(
      {
        author: "Robert C. Martin", 
        blogs: 3
      }
    )
  })

})