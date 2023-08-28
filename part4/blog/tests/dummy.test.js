const listHelper = require('../utils/list_helper')

const emptyBlogList = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(emptyBlogList)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })

  test('when there is no blogs yet', () => {
    const result = listHelper.totalLikes(emptyBlogList)
    expect(result).toBe(0)
  })
})

describe('Favourite Blog', () => {
  test('find a favourite blog from list with many blogs', () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs)
    const reducedListWithManyBlogs = listWithManyBlogs.map(({ title, author, likes }) => ({ title, author, likes }) )
    var match = reducedListWithManyBlogs.find(obj => obj.likes === 12)
    expect(result).toEqual(match)
  })

  test('find a favourite blog from an empty list', () => {
    const result = listHelper.favouriteBlog(emptyBlogList)
    expect(result).toBe(null)
  })

  test('find a favourite blog from a list with single blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    const reducedListWithOneBlog = listWithOneBlog.map(({ title, author, likes }) => ({ title, author, likes }) )
    expect(result).toEqual(reducedListWithOneBlog[0])
  })
})

describe('Autor with most Blogs', () => {
  test('author from multiple blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    const expectedAuthor = { 'Robert C. Martin': 3 }
    expect(result).toEqual(expectedAuthor)
  })

  test('author from single blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expectedAuthor = { 'Edsger W. Dijkstra': 1 }
    expect(result).toEqual(expectedAuthor)
  })

  test('empty list...what would you do???', () => {
    const result = listHelper.mostBlogs(emptyBlogList)
    const expectedAuthor = null
    expect(result).toBe(expectedAuthor)
  })
})

describe('Autor with most likes', () => {
  test('likes from multiple blogs', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    const expectedAuthor = { 'Edsger W. Dijkstra': 17 }
    expect(result).toEqual(expectedAuthor)
  })

  test('likes from single blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const expectedAuthor = { 'Edsger W. Dijkstra': 5 }
    expect(result).toEqual(expectedAuthor)
  })

  test('likes...empty list...what would you do???', () => {
    const result = listHelper.mostLikes(emptyBlogList)
    const expectedAuthor = null
    expect(result).toBe(expectedAuthor)
  })
})