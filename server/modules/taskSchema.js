import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    user_id: { type: String, required: true }
},
    { timestamps: true }
)

export default mongoose.model('task', taskSchema);
