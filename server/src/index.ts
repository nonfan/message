import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { Socket } from "socket.io";
import config from "./config";
import { MessageController } from "./controllers/MessageController";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { routes } from "./routes";
import { ExceptionMiddleHandler } from "./utils/ExceptionMiddleHandler";
import cors = require("cors");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const expressJwt = require("express-jwt");

AppDataSource.initialize().then(() => {
  const app = express(); // 创建服务器

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(
    expressJwt({ secret: config.secretKey }).unless({
      path: ["/user/login", "/user/create", "/email"],
    })
  );

  routes.forEach((route) => {
    app[route.method](
      route.route,
      async (req: Request, res: Response, next: NextFunction) => {
        await new route.controller()[route.action](req, res, next);
      }
    );
  });

  // 捕获异常
  app.use(ExceptionMiddleHandler);

  const server = http.createServer(app);

  const io = socketIO(server);
  const controller = new MessageController();

  io.on("connection", (socket: Socket) => {
    socket.on("main_chat", (message) => {
      io.emit("main_chat", message);
      controller.saveMessage(message);
    });
  });

  server.listen(9090, () => {
    console.log("http://127.0.0.1:9090");
  });
});
