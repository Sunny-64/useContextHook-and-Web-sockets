const socketIo = require("socket.io");

const connectSocket = (server) => {
    const io = socketIo(server);
    return io.on("connection", (socket) => {

        console.log("User is connected");

        socket.on("disconnect", () => {
            console.log("disconnected");
        }); 
    }); 

}

module.exports = connectSocket; 