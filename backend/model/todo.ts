import { Schema, model, connect } from "mongoose";

interface ITodo {
    title: string,
    status: string,
    datetime: Date,
};

const todoSchema = new Schema<ITodo>({
    title: {type: String},
    status: {type: String},
    datetime: {type: Date},
});

const Todo = model<ITodo>('Todo', todoSchema)

export { Todo }
