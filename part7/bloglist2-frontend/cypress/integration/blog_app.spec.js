

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'testuser',
      password: 'secret'
    }
    const user2 = {
      name: 'asd lol',
      username: 'asdlol',
      password: 'secred'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('html').should('contain', 'Login to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('secret')
      cy.get('#login_button').click()
      cy.contains('test user logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('lul')
      cy.get('#login_button').click()
      cy.contains('Invalid')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      //cy.request('POST', 'http://localhost:3003/api/login/', { username:'testuser', password:'secret' })
      //cy.visit('http://localhost:3000')
      cy.get('#username').type('testuser')
      cy.get('#password').type('secret')
      cy.get('#login_button').click()
    })

    it('A blog can be created', function() {
      cy.get('html').contains('Create new blog')
      cy.contains('Create new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#url').type('test.com')
      cy.get('#author').type('test author')
      cy.get('#createNewButton').click()
      cy.get('html').contains('added')
      cy.get('html').contains('test blog')
    })

    it('A blog can be liked', function() {
      cy.get('html').contains('Create new blog')
      cy.contains('Create new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#url').type('test.com')
      cy.get('#author').type('test author')
      cy.get('#createNewButton').click()
      cy.get('.viewHide').click()
      cy.get('.likeButton').click()
      cy.get('html').contains('likes 1')
    })

    it('A user can delete their own blog', function() {
      cy.get('html').contains('Create new blog')
      cy.contains('Create new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#url').type('test.com')
      cy.get('#author').type('test author')
      cy.get('#createNewButton').click()
      cy.get('.viewHide').click()
      cy.get('#removeBlogButton').click()
      cy.get('html').contains('No blogs found')
    })

    it('User can only delete own blogs', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#url').type('test.com')
      cy.get('#author').type('test author')
      cy.get('#createNewButton').click()
      cy.get('#logoutButton').click()
      cy.get('#username').type('asdlol')
      cy.get('#password').type('secred')
      cy.get('#login_button').click()
      cy.get('.viewHide').click()
      cy.get('html').should('not.contain', '#removeBlogButton')
    })

    it.only('Blogs are ordered by likes', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('test blog1')
      cy.get('#url').type('test1.com')
      cy.get('#author').type('test author')
      cy.get('#createNewButton').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('test blog2')
      cy.get('#url').type('test2.com')
      cy.get('#author').type('test author')
      cy.get('#createNewButton').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('test blog3')
      cy.get('#url').type('test3.com')
      cy.get('#author').type('test author')
      cy.get('#createNewButton').click()

      cy.get('.viewHide:first').click()
      cy.get('.likeButton:first').click()
      cy.wait(1000)
      cy.get('.likeButton:first').click()
      cy.get('.viewHide:last').click()
      cy.get('.likeButton:last').click()
      cy.wait(2000)
      cy.get('.details').then($blogs => {
        const likeList = [...$blogs].map(blog => parseInt(blog.innerText.substring(blog.innerText.indexOf('likes')+6,blog.innerText.indexOf('likes')+7)))
        const copied = [...likeList]
        expect(likeList).to.deep.equal(copied.sort((a,b) => {b-a}))
      })
    })
  })
})