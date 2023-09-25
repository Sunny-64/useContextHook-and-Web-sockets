const mongoose = require("mongoose"); 

const initServer = async (app, PORT) => {
    try{
        await mongoose.connect("mongodb://0.0.0.0:27017/todo-list");
        console.log("Db connected"); 
        return app.listen(PORT,()=>{
            console.log("Server is running")
        })
    }
    catch(err){
        console.log(err);
    }
} 

module.exports = initServer; 