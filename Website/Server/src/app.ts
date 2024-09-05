import cors from "cors";
import './config/config'
import express, { Application } from "express";
import ip from "ip";
import { Code } from "./enum/Code";
import { Status } from "./enum/Status";
import { HttpResponse } from "./domain/response";
import studentRoutes from "./routes/student.routes";
import mongoose from "mongoose";
import { studentStudyRoutes } from "./routes/studentStudy.routes";
import volunteerRoutes from "./routes/volunteer.routes";
import volunteerClassRoutes from "./routes/volunteerClassInfo.routes";

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = "Application is running on:";
  private readonly ROUTE_NOT_FOUND = "Route not found";

  constructor(
    private readonly port: string | number = process.env.SERVER_PORT || 3000
  ) {
    this.app = express();
    this.middleWare();
    this.routes();
  }

  listen(): void {
    mongoose.connect(process.env.MONGO_STRING || "")
    .then(()=>{
      console.log("Connected to Database")
      this.app.listen(this.port);
      console.info(`${this.APPLICATION_RUNNING} ${ip.address()} : ${this.port}`);
    })
  }

  private routes(): void {
    this.app.use("/students", studentRoutes);
    this.app.use("/studentStudy" , studentStudyRoutes);
    this.app.use("/volunteer" , volunteerRoutes);
    this.app.use("/volunteerClassInfo" , volunteerClassRoutes);
    this.app.get("/", (req, res) => {
      res
        .status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, "Welcome to our Website"));
    });
    this.app.all("*", (req, res) =>
      res
        .status(404)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            this.ROUTE_NOT_FOUND
          )
        )
    );
  }

  private middleWare(): void {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
  }
}
