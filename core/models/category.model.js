import mongoose from 'mongoose'
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate')

const CategorySchema = new Schema({
	title: {
		type: String,
        require: true,
        index: true        
	},
	description: {
		type: String,
        require: true
    },
	image: {
		type: String,
        require: false,
        default: null
	}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

CategorySchema.plugin(mongoosePaginate)
const Categories = mongoose.model('categories', CategorySchema)

export default Categories