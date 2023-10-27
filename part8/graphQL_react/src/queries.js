import { gql } from '@apollo/client'

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
query ($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
        born
      }
      published
      genres
  }
}
`

export const ADD_BOOK = gql`
mutation createNewBook($title: String!, $author: String!, $publishedInt: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $publishedInt,
    genres: $genres
  ) {
    title
  }
}
`

export const UPDATE_BIRTH_YEAR = gql`
mutation updateAuthorBirthYear($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    name
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