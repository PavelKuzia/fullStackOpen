import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('Blog', () => {
  let user
  let blog
  beforeEach(() => {
    user = { name: 'John Snow', username: 'JohnS', passwordHash: '$2b$10$Y7h9p/Pf4Vk968JHMsI5ZOP7RqnpKbYpSsYT22qsUiX.kP.qKloOC' }

    blog = {
      title: 'test blog title',
      author: 'test blog author',
      url: 'test blog url',
      likes: 0
    }
  })

  test('blog renders only blog title and author', () => {
    const { container } = render(<Blog blog={ blog } user={ user } blogs={ null} setBlogs={ null } />)
    const mainContent = container.querySelector('#mainContent')
    const additionalContent = container.querySelector('#additionalContent')
    expect(mainContent).not.toHaveStyle('display: none')
    expect(additionalContent).toHaveStyle('display: none')
  })

  test('blog url and number of likes are shown after button is clicked', async () => {
    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={ blog } user={ user } blogs={ null } setBlogs={ null } toggleShowForm={ mockHandler } />)
    const userMock = userEvent.setup()
    const button = screen.getByText('view')
    await userMock.click(button)
    const additionalContent = container.querySelector('#additionalContent')
    expect(additionalContent).not.toHaveStyle('display: none')
  })
})

describe('test likes', () => {
  let user, blog
  beforeEach(() => {
    user = { name: 'John Snow', username: 'JohnS', passwordHash: '$2b$10$Y7h9p/Pf4Vk968JHMsI5ZOP7RqnpKbYpSsYT22qsUiX.kP.qKloOC' }
    blog = {
      id: '64ec5ff075cfcbcfab9eff66',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }
  })

  // in order to pass this test another mock funktion should be passed as prop and be used in a handler
  test('number of calls to likes', async () => {
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={ blog } user={ user } testMockFn={ mockHandler }/>)

    const userMock = userEvent.setup()
    const button = container.querySelector('#likesButton')
    await userMock.click(button)
    await userMock.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('test new blog form', () => {
  test('create a new blog', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
    render(<CreateBlogForm createBlogs={createBlog} />)
    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')

    await user.type(inputs[0], 'some title')
    await user.type(inputs[1], 'some author')
    await user.type(inputs[2], 'some url')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('some title')
    expect(createBlog.mock.calls[0][0].author).toBe('some author')
    expect(createBlog.mock.calls[0][0].url).toBe('some url')
  })
})