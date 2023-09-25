const express = require("express"); 
const mongoose = require("mongoose"); 
const cors = require("cors");
const http = require("http"); 
const socketIo = require("socket.io"); 

const app = express(); 

// middlewares 
app.use(express.urlencoded({extended : true})); 
app.use(express.json()); 
app.use(cors()); 

// connect to mongodb
(async () => {
    try{
        mongoose.connect("mongodb://0.0.0.0:27017/todo-list");
    }
    catch(err){
        console.log(err);
    }
})(); 

const todoSchema = new mongoose.Schema({
    title : {type : String}, 
    done : {type : String}, 
    createdAt : {type : Date, default : Date.now}
}); 

const TodoModel = new mongoose.model("Todo", todoSchema); 

// api's
app.get("/", (req, res) => {
    res.status(200).json({
        success : true, 
        message : "Welcome to todo-list backend"
    }); 
})

app.get("/tasks", async (req, res) => {
    try{
        const tasks = await TodoModel.find(); 
        return res.status(200).json({
            success : true, 
            message : "Data fetched", 
            data : tasks
        }); 
    }
    catch(err){
        console.log(err); 
        return res.status(500).json({
            success : "false", 
            message : err.message
        }); 
    }
}); 

app.post("/tasks/add", async (req, res) => {
    try{
        const {title, done} = req.body; 

        if(!(title && done)){
            return res.status(400).json({
                success : false, 
                message : "Invalid Inputs"
            }); 
        }

        const todoObj = new TodoModel({title, done}); 
        const savedTodo = await todoObj.save(); 
        io.emit("taskAdded", () => savedTodo._id);
        return res.status(200).json({
            success : true, 
            message : "Task Added"
        }); 
    }
    catch(err){
        console.log(err); 
        return res.status(500).json({
            success : "false", 
            message : err.message
        }); 
    }
}); 

// configs
const PORT = 3003; 

const server = app.listen(PORT,()=>{
    console.log("Server is running")
})

// socket
// const server = http.createServer(app); 

const io = socketIo(server);

io.on("connection", (socket) => {

    console.log("User is connected"); 

    socket.on("exec", () => {
        console.log("socket executed"); 
    }); 

    socket.on("disconnect", () => {
        console.log("disconnected"); 
    })
})
  

