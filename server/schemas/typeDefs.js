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
type Query {
    user(userId: ID!): User
    oneMatch(matchId: ID!): Match
    getLikes(userId: ID!): User

}
type Mutation {
    addLike(myId: ID!, otherId: ID!): User
}
`;

module.exports = typeDefs;
