const listHelper = require('../utils/list_helper')
const helper = require('./blog_test_helper')


describe('favorite blog', () => {

  test('with an empty list is "no blog was found"', () => {
    const result = listHelper.favoriteBlog(helper.emptyList)
    expect(result).toEqual({blog: "no favorite blog found"})
  })

  test('when a list has only one blog equals that blog', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    expect(result).toEqual(
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      }
    )
  })

  test('of a list of many blogs is the one with most likes', () =>  {
    const result = listHelper.favoriteBlog(helper.listWithManyBlogs)
    expect(result).toEqual(
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      }
    )
  })

})
