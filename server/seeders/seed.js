("../config/connection");
const userSeeds = require("./userSeeds.json");
const db = require('../config/connection');
const {User} = require('../models')

db.once('open', async () => {
    try {
        await User.create(userSeeds);
        console.log("seeding complete")
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
    process.exit(0);
})

