import { Router, Request, Response } from "express";
import { Todo } from "../model/todo";
import { resolve } from "path";
import { rejects } from "assert";
import { Console } from "console";
import { PassThrough } from "stream";

var expressFunction = require('express'); //object to call
const router = expressFunction.Router();
const bp = require('body-parser')

router.use(bp.json())
router.use(bp.urlencoded({ extended: true }))


router.route("/todo")
    .get(async (_req: Request, res: Response) => {
        try {
            const data = (await Todo.find({}));
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send(error);
        }
});

router.route('/todo')
    .post(async (req: Request, res: Response) => {
        // const data = new Todo({title: 'work 1', status: 'Done'});
        const payload = {
            title: req.body.title,
            status: req.body.status
        }
        console.log("payload", payload)
        const payloadTodo = new Todo(payload)
        try {
            await payloadTodo.save()
            res.status(200).send("Add todo successfully");
        } catch (error) {
            res.status(500).send(error)
        }
})

router.route('/todo/:id')
    .delete(async (req: Request, res: Response) => {
        const tid = req.params.id
        console.log("tid:", tid)
        try {
            await Todo.findByIdAndRemove(tid)
            const data = (await Todo.find({}));
            res.status(200).send({message: "Delete todo ID:" + tid + " successfully" , res: data});
        } catch (error) {
            res.status(500).send(error)
        }
    })

router.route('/todo/:id')
    .patch(async (req: Request, res: Response) => {
        const tid = req.params.id
        console.log("tid", tid)
        try {
            await Todo.findByIdAndUpdate({"_id":tid}, req.body)
            const data = (await Todo.find({}));
            res.status(200).send({message: "Update todo ID:" + tid + " successfully" , res: data});
        } catch (error){
            res.status(500).send(error)
        }
    })

export { router };