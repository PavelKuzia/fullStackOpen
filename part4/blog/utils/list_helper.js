var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  for (const blog of blogs) likes += blog.likes
  return likes
}

const favouriteBlog = (blogs) => {
  const compare = (a, b) => {
    if (a.likes > b.likes) return -1
    else if ((a.likes < b.likes)) return 1
    else return 0
  }

  if (blogs.length === 0) return null

  const blogsSorted = blogs.sort(compare)
  return { title: blogsSorted[0].title, author:blogsSorted[0].author, likes:blogsSorted[0].likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const groupedBlogs = _.groupBy(blogs, 'author')
  let authorWithNumberOfBlogs = []
  for (const [key, value] of Object.entries(groupedBlogs)) {
    var obj = {}
    obj[key] = value.length
    authorWithNumberOfBlogs = [...authorWithNumberOfBlogs, obj]
  }
  const mostBlogsAuthor = authorWithNumberOfBlogs.reduce((prev, current) => {
    let keyPrev = Object.keys(prev)[0]
    let valPrev = prev[keyPrev]
    let keyCurrent = Object.keys(current)[0]
    let valCurrent = current[keyCurrent]
    return (valCurrent > valPrev) ? current : prev
  })
  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const groupedBlogs = _.groupBy(blogs, 'author')

  let authorWithLikes = []
  for (const [key, blogs] of Object.entries(groupedBlogs)) {
    var obj = {}
    let likes = 0
    for (const blog of blogs) likes += blog.likes
    obj[key] = likes
    authorWithLikes = [...authorWithLikes, obj]
  }

  const mostLikesAuthor = authorWithLikes.reduce((prev, current) => {
    let keyPrev = Object.keys(prev)[0]
    let valPrev = prev[keyPrev]
    let keyCurrent = Object.keys(current)[0]
    let valCurrent = current[keyCurrent]
    return (valCurrent > valPrev) ? current : prev
  })

  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}