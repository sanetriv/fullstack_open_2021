const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
const { before } = require('lodash')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('get tests', () => {
    test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('bloglist length is correct', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('id exists', () => {
    test('blog has identifier id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('post tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
    })
    test('length increases by 1', async () => {
        const newBlog = 
            {
                "title": "TEST",
                "author": "TEST TEST",
                "url": "TEST.TEST",
                "likes": 100
            }
        await api.post('/api/users').send({"username":"asd", "name":"asd lol", "password":"asdasd"})
        
        const login = { "username":"asd", "password":"asdasd" }
        const logged = await api.post('/api/login').send(login).expect(200)
        const token = logged.body.token
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(1)
    
        const contents = blogsAtEnd.map(n => n.title)
        expect(contents).toContain(
            'TEST'
        )
    })

    test('missing likes', async () => {
        const newBlog =
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
            }
        await api.post('/api/users').send({"username":"asd", "name":"asd lol", "password":"asdasd"})
        const login = { "username":"asd", "password":"asdasd" }
        const logged = await api.post('/api/login').send(login).expect(200)
        const token = logged.body.token

        const savedBlog = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(savedBlog.body.likes).toBe(0)
    })

    test('missing title and url', async () => {
        const newBlog = 
            {
                "author": "asd lol"
            }
        await api.post('/api/users').send({"username":"asd", "name":"asd lol", "password":"asdasd"})
        const login = { "username":"asd", "password":"asdasd" }
        const logged = await api.post('/api/login').send(login).expect(200)
        const token = logged.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('no token', async () => {
        const newBlog =
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
            }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })
})

describe('user tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
    })
    test('username too short', async () => {
        const user =
        {
            "username": "as",
            "name": "lol",
            "password": "asd"
        }
        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
        
        expect(response.body.error).toContain('shorter')
    })
    test('password too short', async () => {
        const user =
        {
            "username": "asd",
            "name": "lol",
            "password": "as"
        }
        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
        const usersFin = await helper.usersInDb()
        expect(usersFin.length).toBe(1)
        expect(response.body.error).toContain('shorter')
    })
    /*test('duplicate username responds 400', async () => {
        const user =
        {
            "username": "root",
            "password": "asd"
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })*/
})

afterAll(() => {
  mongoose.connection.close()
})