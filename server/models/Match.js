const { Schema, model } = require("mongoose");


const matchSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    user2: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    messages: [{type: Schema.Types.ObjectId, ref: 'Message' }]

})

const Match = model('Match', matchSchema)
module.exports = Match;