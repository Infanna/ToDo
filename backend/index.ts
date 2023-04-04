import express from "express"
import { route } from "./route/todo";
import mongoose from "mongoose";

const app = express();

app.use("/", route)

async function mongoConnect() {
    await mongoose.connect("mongodb://test:1234@0.0.0.0:27017/testdb")
}

mongoConnect();

app.listen(3000, function(){
    console.log("Listening on Port 3000");
});
