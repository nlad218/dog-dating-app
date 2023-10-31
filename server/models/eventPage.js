const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  event: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  activity: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
  },
});

const Event = model("Event", eventSchema);

module.exports = Event;
