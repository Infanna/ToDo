"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const mongoose_1 = require("mongoose");
;
const todoSchema = new mongoose_1.Schema({
    title: { type: String },
    status: { type: String, default: "undone" }
});
const Todo = (0, mongoose_1.model)('Todo', todoSchema);
exports.Todo = Todo;
// run().catch(err => console.log(err));
// async function run() {
//     // 4. Connect to MongoDB
//     await connect('mongodb://admin:pass@0.0.0.0:8081');
//     const todo = new Todo({
//       title: 'Work 1',
//       status: 'Done',
//     });
//     await todo.save();
//     console.log(todo.title); 
//   }
