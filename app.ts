import express from "express";
import http from "node:http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import authMiddleware from "./src/auth";

dotenv.config();
const Port = 8082;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
    credentials: true,
  },
  allowRequest: authMiddleware,
});

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("heartRateData", (data) => {
    console.log("[Evento: heartRateData] Datos recibidos:");
    console.log(data);
    io.emit("heartRate", data);
  });

  socket.on("bodyTemperatureData", (data) => {
    console.log("[Evento: bodyTemperatureData] Datos recibidos:");
    console.log(data);
    io.emit("bodyTemperature", data);
  });

  socket.on("oximeterData", (data) => {
    console.log("[Evento: oximeterData] Datos recibidos:");
    console.log(data);
    io.emit("oximeter", data); 
  });

  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
  });
});

server.listen(Port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${Port}`);
});
