const typeDefs = `
type User {
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
user1: [User]
user2: [User]
messages: [Message]
}

type Message {
  user: [User]
  createdAt: String
  messageText: String
}

type Auth {
    token: ID! 
    user: User
}

# QUERIES
## users (except for self)
# pull random users that they haven't already liked or matched with (does not have a chat with current user and not been liked)


# MUTATIONS
## addUser 
## addUser to liked list 
## editProfile 

`;

module.exports = typeDefs;
