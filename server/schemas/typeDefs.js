const typeDefs = `
type User {
    _id: ID
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
user1: User
user2: User
messages: [Message]
}

type Message {
  _id: ID
  user: User
  createdAt: String
  messageText: String
}

type Auth {
    token: ID! 
    user: User
}

type Query {
  users: [User]
  user(userId: ID!): User
  oneMatch(matchId: ID!): Match
  getLikes(userId: ID!): User
  me: User
  getRandomUsers: [User]
  filterUsersByBreed: [User]

}

type Mutation {
  createUser(ownerName: String!, email: String!, password: String!): Auth
  deleteUser(userId: ID!): User
  addToLikes(otherId: ID!): User
  createMatch(otherId: ID!): User
  addLikeCheckAddMatch(otherId: ID!): User
  createMessage(messageText: String!, matchId: ID!): Message
  login(email: String!, password: String!): Auth
  logout: String
  updateUser(ownerName: String, email: String, password: String, dogName: String, breed: String, age: Int, size: String, about: String, image: String, hobbies: [String]): User
}
`;

module.exports = typeDefs;
