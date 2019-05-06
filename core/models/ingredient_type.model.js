import mongoose from 'mongoose'
const { Schema } = mongoose
const mongoosePaginate = require('mongoose-paginate')

const IngredientTypeSchema = new Schema({
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

IngredientTypeSchema.plugin(mongoosePaginate)
const IngredientTypes = mongoose.model('type_ingredients', IngredientTypeSchema)

export default IngredientTypes