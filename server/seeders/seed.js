("../config/connection");
const userSeeds = require("./userSeeds.json");
const db = require('../config/connection');
const {User} = require('../models')

db.once('open', async () => {
    try {
        const newSeed = await User.create(userSeeds);
        console.log(newSeed)
        const allUsers = await User.find();
        for (let x = 0 ; x<allUsers.length; x++) {
            if(x>= allUsers.length-2){
                const singleUser = await User.findOneAndUpdate(
                    {_id: allUsers[x]._id.toString()},
                    {$push: {likes: allUsers[0]._id.toString()}})
                const singleUser2 = await User.findOneAndUpdate(
                    {_id: allUsers[x]._id.toString()},
                    {$push: {likes: allUsers[1]._id.toString()}})    
            }else{
                const singleUser = await User.findOneAndUpdate(
                {_id: allUsers[x]._id.toString()},
                {$push: {likes: allUsers[x+1]._id.toString()}})
                const singleUser2 = await User.findOneAndUpdate(
                    {_id: allUsers[x]._id.toString()},
                    {$push: {likes: allUsers[x+2]._id.toString()}})
            }
            
        }

        console.log("seeding complete")
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
    process.exit(0);
})

