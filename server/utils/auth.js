const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = "mysecret";
const expiration = "2h";

module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }
    return req;
  },
  signToken: function ({ ownerName, email, _id, dogName, image, breed, age, size, about, hobbies, likes, matches }) {
    const payload = { ownerName, email, _id, dogName, image, breed, age, size, about, hobbies, likes, matches };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
