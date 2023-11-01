const typeDefs = `
type User {
   name: String
   email: String
   password: String 
},

type DogProfile {
    name: String
    image: String
    breed: String
    age: Int
    size: String
    about: String
    hobbies: [String]
    user: User
    // likes: 
}

type Event {
    event: String
    location: String
    activity: String 
    eventDate: String 
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
