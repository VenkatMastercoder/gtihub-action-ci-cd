const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Hello Github Action Working V1"});
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy"});
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
