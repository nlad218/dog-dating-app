const typeDefs = `
type User {
<<<<<<< HEAD
=======
    _id: ID
>>>>>>> main
    ownerName: String
    email: String
    password: String 
    dogName: String
    image: String
    breed: String
    age: Int
    size: String
    about: String
    hobbies: [String]
    likes: [User]
    matches: [Match]
}

type Match {
  _id: ID
user1: [User]
user2: [User]
messages: [Message]
}

type Message {
  _id: ID
  user: [User]
  createdAt: String
  messageText: String
}

type Auth {
    token: ID! 
    user: User
}

type Query {
  user: 
  users:
  me:
}

# QUERIES
## users (except for self)
# pull random users that they haven't already liked or matched with (does not have a chat with current user and not been liked)

type Query {
    user: User
}

# MUTATIONS
## addUser
## addUser to liked list 
## editProfile 

type Mutation {
<<<<<<< HEAD
    createUser(ownerName: String!, email: String!, password: String!): Auth
}

=======
  login(): 
  createUser: 
  deleteUser:
  updateUser:
}



>>>>>>> main
`;

module.exports = typeDefs;
