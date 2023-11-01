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

# need to insert queries 

# insert mutations 

`;

module.exports = typeDefs;
