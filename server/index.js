import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hej");
});

app.listen(3000);
