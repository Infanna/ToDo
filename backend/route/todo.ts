import { Router, Request, Response} from "express";
import { Todo } from "../model/todo";

const route = Router();

route.get("/todo", async (_req: Request, res: Response) => {
    try {
       const data = (await Todo.find({}));
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

route.post('/todo', async (_req: Request, res: Response) => {
    const data = new Todo({title: 'work 1', status: 'Done'});
    try {
        await data.save();
        res.send(200).send("save success");
    } catch (error) {
        res.status(500).send(error)
    }
})

export {route};