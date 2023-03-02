import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hej");
});

const channelsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLenght: 1,
      maxLenght: 30,
    },
  },
  { timestamps: true }
);

const Channel = mongoose.model("channels", channelsSchema);

app.get("/channels", async (req, res) => {
  const channels = await Channel.find();
  res.send([channels]);
});

app.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://MartinApiwat:Martin123@cluster0.rigswq4.mongodb.net/?retryWrites=true&w=majority"
  );
});
