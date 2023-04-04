"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const todo_1 = require("../model/todo");
const route = (0, express_1.Router)();
exports.route = route;
// route.get("/todo", (req: Request, res: Response) => {
//     Todo.find((err, val) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.status(200).json(val);
//         }
//     })
// });
route.get("/todo", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = (yield todo_1.Todo.find({}));
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send("error");
    }
}));
route.post('/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = new todo_1.Todo({ title: 'work 1', status: 'Done' });
    yield data.save();
    res.send("todo post");
}));
