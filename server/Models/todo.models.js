import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    }
})
export const TodoModel = mongoose.model("Todo", TodoSchema)