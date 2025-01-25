import mongoose from "mongoose";
const Schema = mongoose.Schema;
const SubcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
