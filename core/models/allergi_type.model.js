import mongoose from 'mongoose'
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate')

const AllergiTypeSchema = new Schema({
	title: {
		type: String,
        require: true,
        index: true        
	},
	description: {
		type: String,
        require: false,
        default: null
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

AllergiTypeSchema.plugin(mongoosePaginate)
const AllergiTypes = mongoose.model('allergi_types', AllergiTypeSchema)

export default AllergiTypes