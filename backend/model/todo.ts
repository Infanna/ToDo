import { Schema, model, connect } from "mongoose";

interface ITodo {
    title: string,
    status: string,
};

const todoSchema = new Schema<ITodo>({
    title: {type: String},
    status: {type: String, default: "undone"}
});

const Todo = model<ITodo>('Todo', todoSchema)

export { Todo }
