const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/charRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.status(200).json({ state: "SERVER ON" });
});

app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
