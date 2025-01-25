import mongoose from "mongoose";
const Schema = mongoose.Schema;
// ! This is the schema for the Item model. It defines the fields that will be stored in the database for each item.
const ItemSchema = new Schema({
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
  baseAmount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  onModel: {
    type: String,
    required: true,
    enum: ["Category", "Subcategory"],
  },
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "onModel",
  },
});
const Item = mongoose.model("Item", ItemSchema);
export default Item;
