const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

try {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("DB Connection Successfully");
} catch (error) {
    console.error("DB Connection Error:", error);
}


const server = app.listen(process.env.PORT,()=> {
console.log(`Server Started on Port ${process.env.PORT}`)
})

const io = socket(server, {
    cors:{
        origin: `${process.env.BASE_URL}`,
        credential: true,
    }
});

global.onlineUsers = new Map();

io.on("connection",(socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg",(data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});