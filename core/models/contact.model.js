import mongoose from 'mongoose'
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate')

const ContactSchema = new Schema({
	title: {
		type: String,
        require: true,
        index: true        
	},
	messages: {
		type: String,
        require: true
    },
	user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        require: true
	}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

ContactSchema.plugin(mongoosePaginate)
const Contacts = mongoose.model('contacts', ContactSchema)

export default Contacts