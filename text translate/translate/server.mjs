import express from "express";
import translate from "./src/index.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); // To parse JSON request bodies
app.use(express.text());

// POST /translate
app.post("/translate", async (req, res) => {
  let parsed = req.body;
  console.log(req, "data");

  if (!parsed?.text) {
    parsed = JSON.parse(Object.keys(req.body)[0]);
  }
  console.log(parsed, "text");
  const { text, to } = parsed; // Get text and target language from request

  if (!text || !to) {
    return res
      .status(400)
      .json({ error: "Please provide text and target language." });
  }

  try {
    const result = await translate(text, { to });
    console.log(result, "data");
    res.json({ translated: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Translate API running on http://localhost:${PORT}`);
});
