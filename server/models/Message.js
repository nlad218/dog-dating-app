const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: (date => {return date.toString()})
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
})

const Message = model('Message', messageSchema)
module.exports = Message;