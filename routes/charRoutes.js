const express = require("express");
const { askGemini } = require("../controllers/chatController");

const router = express.Router();

router.post("/ask", askGemini);

module.exports = router;
