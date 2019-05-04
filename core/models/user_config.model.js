import mongoose from "mongoose";
const { Schema } = mongoose;

const UserConfigSchema = new Schema({
  user_id: {
    type: Number,
    require: true
  },
  meal_type: {
    type: Number,
    require: true
  },
  menu_type: {
    type: Number,
    require: true
  },
  allergy: [],
  dislike_ingredient: [],
  meal_size: {
    type: Number,
    require: true
  },
  unit: { type: Number }
});

const userConfig = mongoose.model("user_configs", UserConfigSchema);

export default userConfig;
