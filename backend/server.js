import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ reply: "No messages provided" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: messages
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("Groq error:", error);
    res.status(500).json({ reply: "Something went wrong." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
