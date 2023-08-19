import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
// import { ACTIONS } from './src/Actions';
// import { JOIN, JOINED } from './src/Actions';
const server = createServer(app);
const io = new Server(server);

app.use (express.static('build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
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
        // console.log(clients);
        clients.forEach(({socketId}) =>{
              io.to(socketId).emit('joined',{
                clients,
                username,
                socketId: socket.id,
              });
        });
    });

    // socket.on('sync-code', ({socketId, value})=>{
    //     io.to(socketId).emit('code-change', {code})
    // })

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) =>{
             socket.in(roomId).emit('disconnected', {
                socketId: socket.id,
                username: userSocketMap[socket.id],
             });
        });
    delete userSocketMap[socket.id];
    socket.leave();

    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

