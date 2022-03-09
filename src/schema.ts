import { gql } from 'apollo-server'

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    posts(input: PostsInput): [Post]
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Mutation {
    registerUser(input: CreateUserInput!): User!
  }

  input PostsInput {
    id: String
  }

  type Query {
    users: [User!]!
    posts(input: PostsInput): [Post]
  }

  type Post {
    id: ID!
    title: String!
    authorId: ID!
  }
`

export default typeDefs
