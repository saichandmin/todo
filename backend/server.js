const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Set up API endpoint
app.get("/api", (req, res) => {
  res.json({ msg: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
