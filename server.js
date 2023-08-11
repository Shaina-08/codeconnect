import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
// import ACTIONS from './src/Actions';
// import { JOIN, JOINED } from './src/Actions';
const server = createServer(app);
const io = new Server(server);


const userSocketMap = {};

function getAllConnectedClients(roomId){
   return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
    return{
        socketId,
        username: userSocketMap[socketId],
    };
   });
}

io.on('connection',(socket) =>{
    console.log('socket connected ', socket.id);
    socket.on('join', ({roomId, username})=>{
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({socketId}) =>{
              io.to(socketId).emit('joined',{
                clients,
                username,
                socketId: socket.id,
              });
        });
    });
});

const PORT = process.env.PORT || 5075;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

