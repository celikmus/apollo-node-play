import { CreateUserInput, MutationResolvers, QueryResolvers } from './generated/types'
import datasource, { posts } from './datasource'

const createUser: MutationResolvers['registerUser'] = (parent, args) => {
  const { email, firstName, lastName, password }: CreateUserInput = args.input

  const user = {
    email,
    firstName,
    id: `${datasource.length + 1}`,
    lastName,
    password,
  }

  datasource.push(user)

  return user
}

const findAllUsers: QueryResolvers['users'] = () => {
  return datasource
}

// Record<string, MutationResolvers | QueryResolvers | GraphQLTypeResolver<any, any>>
const resolvers = {
  Mutation: {
    registerUser: createUser,
  },
  Query: {
    users: findAllUsers,
    posts: () => {
      return posts
    },
  },
  User: {
    posts: (parent, args) => {
      const {
        input: { id },
      } = args
      return id ? posts.filter((po) => po.id === id && po.authorId === parent.id) : posts
    },
  },
}

export default resolvers
