import express from "express";
import http from "node:http";
import dotenv from "dotenv";
import { Server } from 'socket.io';
import authMiddleware from "./src/auth";
import { emitSocket } from "./src/helpers/emit";

dotenv.config();
const Port = 8082;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
        credentials: true
    },
    allowRequest: authMiddleware
});

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('heartRateData', (data) => {
        const dataParsed = JSON.parse(data);
        const processedData = emitSocket(dataParsed);
        console.log(processedData);

        // Emisión del mensaje procesado a todos los clientes
        io.emit('heartRate', processedData);
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

// Iniciar el servidor
server.listen(Port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${Port}`);
});
