import { OpenAI } from "openai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
dotenv.config();

const opennai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function fetchReport(data) {
  const message = [
    {
      role: "system",
      content:
        "You are a trading guru. Given data on share prices over the past 3 days, write a report of less than 150 words describing the stock performance and recommending whether to buy, hold or sell",
    },
    {
      role: "user",
      content: data,
    },
  ];
  try {
    const response = await opennai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: message,
    });

    
    return response.choices[0].message.content;
  } catch (err) {
    console.log("Error:" + err);
    throw err;
  }
}

app.post("/fetchReport", async (req, res) => {
  try {
    const report = await fetchReport(req.body.stockData);
    res.json({ report });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
