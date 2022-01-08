const _= require('lodash')


// dummy returns 1
const dummy = blogs => 1


// finds out the total number of likes in a list of blogs
const totalLikes = blogs => {
  totalAmount = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return totalAmount
}


// finds the blog with most likes out of a list of blogs
const favoriteBlog = blogs => {
  const max = blogs.reduce((number, blog) => Math.max(number, blog.likes), 0)
  if (max === 0) {
    return {blog: "no favorite blog found"}
  } else {
    const blogWithMostLikes = blogs.find(blog => blog.likes === max)
    return {
      title: blogWithMostLikes.title,
      author: blogWithMostLikes.author,
      likes: blogWithMostLikes.likes
    }
  }
}


// from a list of blogs finds the author who has written most blogs and returns an object with the name of the author and the number of their blogs
const mostBlogs = blogs => {
  let authors = {} // authors will hold each author's name as keys and the number of their blogs as values

  _.forEach(blogs, (value) => { // for each blog in the list of blogs (value is one blog)

    if (value.author in authors) { 
      authors[value.author] += 1 
    } else {
      authors[value.author] = 1
    }
  })

  if (_.isEmpty(authors)) { // if the authors object is empty, return it (using reduce with it would throw an error)
    return {}

  } else {
    // find the key with biggest value using reduce
    const authorWithMostBlogs = Object.keys(authors).reduce((previousValue, currentValue) => 
    authors[previousValue] > authors[currentValue] 
    ? previousValue // when true
    : currentValue // when false
    )
    // return e.g. {author: 'Robert C. Martin', blogs: 2}
    return {author: authorWithMostBlogs, blogs: authors[authorWithMostBlogs]}
  }
}


// from a list of blogs finds the author whose blogs have the most likes
const mostLikes = (blogs) => {
  const authors = {} // authors will hold each author's name as keys and the number of their likes as values

  _.forEach(blogs, (value) => { // for each blog in the list of blogs (value is one blog)
    if (value.author in authors) {
      authors[value.author] += value.likes
    } else {
      authors[value.author] = value.likes
    }
  })

  if (_.isEmpty(authors)) { // if the authors object is empty, return it (using reduce with it would throw an error)
    return {}

  } else {
    // find the key with biggest value using reduce
    const authorWithMostLikes = Object.keys(authors).reduce((previousValue, currentValue) => 
    authors[previousValue] > authors[currentValue] 
    ? previousValue // when true
    : currentValue // when false
    )
    // return e.g. {author: 'Robert C. Martin', likes: 12}
    return {author: authorWithMostLikes, likes: authors[authorWithMostLikes]}
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}