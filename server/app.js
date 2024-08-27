import express from "express";
import helmet from "helmet";
import router from "./routers/appRouter.js";

const app = express();

app.use(helmet());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server side!" });
});

app.use("/api", router);

export default app;
