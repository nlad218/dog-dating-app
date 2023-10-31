const db = require('../config/connection');
const {User} = require('../models')
const userSeeds = require('./userSeeds.json');

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