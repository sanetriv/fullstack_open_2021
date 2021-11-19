import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
//import { prettyDOM } from '@testing-library/dom'

test('renders content', () => {
  const blog = {
    author: 'test author',
    url: 'test.com',
    title: 'test blog',
    likes: 5,
    user : {
      username: 'testuser'
    }
  }
  const updateLikes = jest.fn()
  const deleteBlog = jest.fn()
  const user = {
    username: 'testuser'
  }
  const component = render(
    <Blog blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user}/>
  )
  //component.debug()

  expect(component.container).toHaveTextContent(
    'test author'
  )
  expect(component.container).toHaveTextContent(
    'test blog'
  )
  const div = component.container.querySelector('.details')
  //console.log(prettyDOM(div))
  expect(div).toHaveStyle({ display: 'none' })
})

test('clicking view shows details', () => {
  const blog = {
    author: 'test author',
    url: 'test.com',
    title: 'test blog',
    likes: 5,
    user : {
      username: 'testuser'
    }
  }
  const updateLikes = jest.fn()
  const deleteBlog = jest.fn()
  const user = {
    username: 'testuser'
  }
  const component = render(
    <Blog blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user}/>
  )
  const button = component.container.querySelector('.viewHide')
  fireEvent.click(button)

  const style = component.container.querySelector('.details').style
  //console.log(prettyDOM(div))
  //console.log(style)
  expect(style._length).toBe(0)
})
test('liking twice calls updateLike twice', () => {
  const blog = {
    author: 'test author',
    url: 'test.com',
    title: 'test blog',
    likes: 5,
    user : {
      username: 'testuser'
    }
  }
  const deleteBlog = jest.fn()
  const user = {
    username: 'testuser'
  }
  const clickLike = jest.fn()
  const component = render(
    <Blog blog={blog} updateLikes={clickLike} deleteBlog={deleteBlog} user={user}/>
  )
  const button = component.container.querySelector('.likeButton')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(clickLike.mock.calls).toHaveLength(2)
})