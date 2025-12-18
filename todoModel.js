import mongoose from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please add todo name"],
      trim: true,
      maxlength: [50, "title cant be more than 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "description can't be more than 500 characters"],
    },
    isCompleted: { type: Boolean, default: false },
    priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
    duedate: { type: Date },
    user: { type:String, required: true, unique:true},
  },
  { timestamps: true }
);
const todoModel = mongoose.model("todo",todoSchema);
export { todoModel }; 