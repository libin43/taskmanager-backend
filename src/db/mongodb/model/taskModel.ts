import mongoose, { Schema } from "mongoose"

const commentSchema = new Schema(
    {
        comment: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
);


const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 100,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        comments: [commentSchema], // Array of comments
        status: {
            type: String,
            enum: ["PENDING", "ONGOING", "COMPLETED"],
            default: "PENDING",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const TaskModel = mongoose.model("tasks", taskSchema)
