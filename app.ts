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

  // Listener para datos de ritmo cardíaco
  socket.on("heartRateData", (data) => {
    console.log("[Evento: heartRateData] Datos recibidos:");
    console.log(data);
    io.emit("heartRate", data);
  });

  // Listener para datos de temperatura corporal
  socket.on("bodyTemperatureData", (data) => {
    console.log("[Evento: bodyTemperatureData] Datos recibidos:");
    console.log(data);
    io.emit("bodyTemperature", data);
  });

  // Listener para datos del oxímetro
  socket.on("oximeterData", (data) => {
    console.log("[Evento: oximeterData] Datos recibidos:");
    console.log(data);
    io.emit("oximeter", data); // Reenvía los datos a los clientes
  });

  // Listener para datos del acelerómetro
  socket.on("acelerometerData", (data) => {
    console.log("[Evento: acelerometerData] Datos recibidos:");
    console.log(data);
    io.emit("acelerometer", data); // Reenvía los datos del acelerómetro a los clientes
  });

  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
  });
});

server.listen(Port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${Port}`);
});
