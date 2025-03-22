const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const api = process.env.API_KEY;

const modelo = process.env.MODEL_API;

const askGemini = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const genAI = new GoogleGenerativeAI(api);
  const model = genAI.getGenerativeModel({ model: modelo });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Eres un ingeniero agronomo  y veterinario ,especializado en alimentacion animal, con respuesta formal , concreta y citar fuente comprobada como las publicaciones www.inia.uy para aspectos agronomicos la SMV veterinaria del uruguay para aspectos de veterinaria o zootecnia",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Entendido, estoy listo para responder preguntas sobre alimentacion animal y vegetal ",
          },
        ],
      },
    ],
    generationConfig: {
      /* maxOutputTokens: 200, */
      temperature: 0.7,
      topK: 1,
      topP: 1,
    },
  });

  try {
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ response: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { askGemini };
