const listHelper = require('../utils/list_helper')
const blogLists = require('./blog_lists')


describe('favorite blog', () => {

  test('with an empty list is "no blog was found"', () => {
    const result = listHelper.favoriteBlog(blogLists.emptyList)
    expect(result).toEqual({blog: "no favorite blog found"})
  })

  test('when a list has only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(blogLists.listWithOneBlog)
    expect(result).toEqual(
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      }
    )
  })

  test('of a list of many blogs is the one with most likes', () =>  {
    const result = listHelper.favoriteBlog(blogLists.listWithManyBlogs)
    expect(result).toEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      }
    )
  })

})
