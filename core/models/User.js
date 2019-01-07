import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
export default mongoose.model("users", UserSchema);