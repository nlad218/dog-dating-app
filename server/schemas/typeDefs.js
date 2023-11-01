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
type Query {
    user(userId: ID!): User
    oneMatch(matchId: ID!): Match
    getLikes(userId: ID!): User

}

type Mutation {
  login(): 
  createUser: 
  deleteUser:
  updateUser:
  addLike(myId: ID!, otherId: ID!): User
}



`;

module.exports = typeDefs;
