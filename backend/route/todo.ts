import { Router, Request, Response } from "express";
import { Todo } from "../model/todo";
import { KafkaClient, Producer, ProduceRequest } from "kafka-node";

var expressFunction = require('express'); //object to call
const router = expressFunction.Router();

//kafka
const kafkaClient = new KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(kafkaClient);
const topicName = 'test_topic'


function SendDataToKafka(message: object) {
    const jsonString = JSON.stringify(message);
    const kafkaMessage: ProduceRequest[] = [{
        topic: topicName,
        messages: [jsonString]
    }];

    producer.send(kafkaMessage, (error, result) => {
        if (error) {
            console.error(error);
            return(error.message);
        } else {
            console.log('Message sent to Kafka:', result);
            return(result);
        }
    });
}

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
        const payload = {
            title: req.body.title,
            status: req.body.status,
            datetime: req.body.datetime
        }
        console.log("payload", payload)
        const payloadTodo = new Todo(payload)

        const session = router.startSession();

        try {
            await payloadTodo.save();
            await SendDataToKafka(payloadTodo);
            res.status(200).send({message: "Add todo successfully", res: payloadTodo});
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