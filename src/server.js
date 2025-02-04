import express from "express";
import uploadRoute from "./routes/upload.routes.js";
import { env } from "./config/env.js";

const app = express();
const PORT = env.PORT || 3000;

app.use(express.json());
app.use("/api", uploadRoute);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
