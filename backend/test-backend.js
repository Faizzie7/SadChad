import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔎 1️⃣ Simple health check route
app.get("/health", (req, res) => {
  res.json({
    status: "Backend is running ✅",
    time: new Date(),
    envLoaded: !!process.env.GROQ_API_KEY
  });
});

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

// 🔎 2️⃣ Debug Chat Route
app.post("/chat", async (req, res) => {
  console.log("\n===== NEW REQUEST =====");

  try {
    console.log("Incoming body:", req.body);
    console.log("Type of body:", typeof req.body);

    const { messages } = req.body;

    console.log("Messages:", messages);
    console.log("Is Array?", Array.isArray(messages));

    if (!messages) {
      console.log("❌ No messages provided");
      return res.status(400).json({ reply: "No messages provided" });
    }

    console.log("Calling Groq...");

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: messages
    });

    console.log("Groq raw response:", completion);
    console.log(
      "Groq message content:",
      completion.choices?.[0]?.message?.content
    );
    console.log(
      "Type of reply:",
      typeof completion.choices?.[0]?.message?.content
    );

    res.json({
      reply: completion.choices?.[0]?.message?.content
    });

  } catch (error) {
    console.error("🔥 FULL ERROR:", error);
    res.status(500).json({
      reply: "Something went wrong.",
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
