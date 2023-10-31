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
`;

module.exports = typeDefs;
