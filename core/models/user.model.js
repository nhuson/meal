import mongoose from 'mongoose'
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate')

const UserSchema = new Schema({
	firstname: {
		type: String,
		require: true,
	},
	lastname: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	avatar: {
		type: String,
		require: false,
		default: null,
	},
	provider: {
		type: String,
		require: false,
		default: null,
	},
	provider_id: {
		type: String,
		require: false,
		default: null,
	},
	status: {
		type: Number,
		require: true,
		default: 1,
	},
	recovery_code: {
		type: String,
		require: false,
		default: null,
	},
	role: {
		type: String,
		require: true,
		default: 'user',
	},
	created_at: {
		type: Date,
		default: Date.now(),
	},
	updated_at: {
		type: Date,
		default: Date.now(),
	},
})

UserSchema.plugin(mongoosePaginate)
const Users = mongoose.model('users', UserSchema)

export default Users
