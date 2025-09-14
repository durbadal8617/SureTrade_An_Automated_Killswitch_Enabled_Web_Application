const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const Restriction = require("./restriction_models/Restriction");
const { MONGO_URL, PORT, GROQ_API_KEY } = process.env;

// Enhanced MongoDB connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB is connected successfully");
    console.log("Connected to database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.error(
      "Connection string (sanitized):",
      MONGO_URL.replace(/:([^:@]+)@/, ":****@")
    );
  });

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make sure these routes are defined AFTER all middleware but BEFORE mounting authRoute
app.get("/api/users/:userId/restrictions", async (req, res) => {
  try {
    const userId = req.params.userId;

    const restriction = await Restriction.findOne({
      userId,
      expiresAt: { $gt: new Date() },
    });

    if (restriction) {
      return res.json({
        restricted: true,
        message: restriction.reason || "You're restricted from trading today",
      });
    }
    res.json({ restricted: false });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/users/:userId/restrict", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { reason } = req.body;

    const today = new Date();
    const expiresAt = new Date(today);
    expiresAt.setHours(23, 59, 59, 999); // Expire at the end of today

    // Create restriction
    const restriction = await Restriction.create({
      userId,
      reason: reason || "P&L loss exceeded 10%",
      expiresAt,
    });

    res.json({ success: true, restriction });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.use("/", authRoute); //This is important don't delete

// API endpoint to handle chat queries
// API endpoint to handle chat queries
app.post("/api/ask", async (req, res) => {
  const query = req.body.query;

  try {
    // ✅ Use one of Groq's supported models
    const modelId = "meta-llama/llama-4-scout-17b-16e-instruct"; 
    // Alternatives: "llama3-8b-8192", "mixtral-8x7b-32768", "gemma-7b-it"

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: modelId,
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: query }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`, // 👈 from your .env
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Extract answer from Groq’s response
    const answer =
      response.data.choices?.[0]?.message?.content ||
      "No response from Groq model.";

    res.json({ answer });
  } catch (error) {
    console.error(
      "Error interacting with Groq API:",
      error.response?.data || error.message
    );
    res.status(500).json({
      answer:
        "I'm having trouble connecting to Groq right now. Please try again later.",
    });
  }
});


//This is important don't delete
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});