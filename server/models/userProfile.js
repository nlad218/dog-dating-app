const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
	ownerName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, "Must match an email address!"],
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
	},
	dogName: {
		type: String,
		trim: true,
	},
	image: {
		type: String,
	},
	breed: {
		type: String,
	},
	age: {
		type: Number,
		trim: true,
	},
	size: {
		type: String,
		trim: true,
	},
	about: {
		type: String,
		trim: true,
	},
	hobbies: {
		type: Array,
	},
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	matches: [{ type: Schema.Types.ObjectId, ref: "Match" }],
});

//set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
