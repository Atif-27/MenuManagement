import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
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
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
export default Subcategory;