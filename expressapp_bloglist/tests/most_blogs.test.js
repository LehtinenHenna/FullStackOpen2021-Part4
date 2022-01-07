const listHelper = require('../utils/list_helper')
const blogLists = require('./blog_lists')


describe('most blogs', () => {

  test('with an empty list is empty object', () => {
    const result = listHelper.mostBlogs(blogLists.emptyList)
    expect(result).toEqual({})
  })

  test('when a list has only one blog equals an object {<authorOfThatBlog> : 1}', () => {
    const result = listHelper.mostBlogs(blogLists.listWithOneBlog)
    expect(result).toEqual(
      {
        author:'Edsger W. Dijkstra', 
        blogs: 1
      }
    )
  })

  test('of a list of many blogs the result is an object with the author of most blogs as key and number of their blogs as value', () =>  {
    const result = listHelper.mostBlogs(blogLists.listWithManyBlogs)
    expect(result).toEqual(
      {
        author: "Robert C. Martin", 
        blogs: 3
      }
    )
  })

})