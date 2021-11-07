import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Newblogform from './Newblogform'

test('createBlog is called with right details', () => {
  const createBlog = jest.fn()
  const component = render(
    <Newblogform createBlog={createBlog} />
  )
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')
  const form = component.container.querySelector('form')
  fireEvent.change(author, {
    target: { value: 'test author' }
  })
  fireEvent.change(url, {
    target: { value: 'test.com' }
  })
  fireEvent.change(title, {
    target: { value: 'test blog' }
  })
  fireEvent.submit(form)
  expect(createBlog).toHaveBeenCalledWith('test blog', 'test author', 'test.com')
})