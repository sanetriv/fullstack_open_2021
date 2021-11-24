import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query allBooks($genre: String){
  allBooks(genre: $genre){
    title
    published
    genres
    author {
      name
      bookCount
      born
    }
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
      bookCount
      born
    }
    published
    genres
    id
  }
}
`

export const EDIT_AUTHOR = gql`
mutation modifyAuthor($name: String!, $born: Int!) {
  editAuthor (
    name: $name
    setBornTo: $born
  ) {
    name
    born
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const RECS = gql`
  query {
    recs {
      books{
        title
        published
        genres
        author {
          name
          bookCount
          born
        }
      }
      user {
        username
        favoriteGenre
      }
    }
  }
`