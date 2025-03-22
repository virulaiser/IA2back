import express from "express";
import cors from "cors";
import chatRoutes from "./routes/charRoutes.js";
import "dotenv/config";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ estado: "API ON" });
});

app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
