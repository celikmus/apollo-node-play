import { CreateUserInput, MutationResolvers, QueryResolvers } from './generated/types'
import datasource, { posts } from './datasource'

const createUser: MutationResolvers['registerUser'] = (_parent, args) => {
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
        input: { id, title },
      } = args
      return id || title
        ? posts
            .filter((po) => {
              return id ? po.authorId === parent.id && po.id === id : true
            })
            .filter((po) => {
              return po.authorId === parent.id && (title ? new RegExp(title.replace(/\*+/g, '.+')).test(po.title) : true)
            })
        : posts
    },
  },
}

export default resolvers
