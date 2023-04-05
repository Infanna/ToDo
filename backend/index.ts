import { router } from "./route/todo";
const expressFunction = require('express');
const mongoose = require('mongoose');

var expressApp = expressFunction(); //object to call

const url = "mongodb://test:1234@0.0.0.0:27017/testdb";
const config ={
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

expressApp.use((req: any,res: any,next: any)=>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
    return next()
});

expressApp.use(expressFunction.json({ limit: '16mb' }));

expressApp.use((req: any,res: any,next: any)=>{
    mongoose.connect(url,config)
    .then(()=>{
        console.log('Connect to MongoDB..');
        next();
    })
    .catch((err:any) =>{
        console.log('Cannot connect to MongoDB ' + err)
        res.status(501).send('Cannot connect to MongoDB ' + err)
    });
});

expressApp.use("/", router)

expressApp.listen(3000, function(){
    console.log("Listening on Port 3000");
});
