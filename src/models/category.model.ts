import mongoose from "mongoose";
const Schema = mongoose.Schema;

// ! This is the schema for the Category model. It defines the fields that will be stored in the database for each category.
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  taxApplicability: {
    type: Boolean,
    default: false,
  },
  tax: {
    type: Number,
    default: 0,
  },
  taxType: String,
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;