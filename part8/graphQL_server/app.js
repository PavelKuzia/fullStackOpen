const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to MongoDB')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

	type Author {
		name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
	}

	type Book {
		title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]
	}

  type Query {
    bookCount: Int!
		authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
		authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      return await Author.find( {} )
    },
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.find( {name: args.author })
        return await Book.find( {'author.id': author._id, genres: args.genre} ).populate('author')   
      } else if (args.author && !args.genre) {
        const author = await Author.find( {name: args.author })
        return await Book.find( { 'author.id': author._id } ).populate('author')   
      } else if (!args.author && args.genre) {
        return await Book.find( {genres: args.genre} ).populate('author')
      } else {
        return await Book.find( {} ).populate('author')
      }
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      const booksByAuthor = await Book.find( { 'author': root._id } )
      return booksByAuthor.length 
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('User is not authorized', {
          extensions: {
            code: 'WRONG_CREDENTIALS',
            invalidArgs: args.name,
          }
        })
      }
      let author = await Author.findOne( { name: args.author })
      if (!author) {
        const newAuthor = Author( { name: args.author })
        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Saving new author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }    
      }
      const book = Book( { ...args, author: author.id })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return book
      },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('User is not authorized', {
          extensions: {
            code: 'WRONG_CREDENTIALS',
            invalidArgs: args.name,
          }
        })
        return null
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      const id = new mongoose.Types.ObjectId(author.id)
      return await Author.findOneAndUpdate({ _id: id }, {$set: { born: args.setBornTo }} )
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 }, context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})