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
  res.send(channels);
});

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minLenght: 1,
    },
    user: {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channels",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("messages", messageSchema);

app.get("/channels/:id", async (req, res) => {
  await Message.insertMany([
    {
      text: "Första meddelandet",
      user: {
        name: "Martin",
        image: "https://avatars.githubusercontent.com/u/77362975?v=4",
      },
      channelId: "64007aafbf14a94d6dba877a",
    },
    {
      text: "Andra meddelandet",
      user: {
        name: "Martin",
        image: "https://avatars.githubusercontent.com/u/77362975?v=4",
      },
      channelId: "64007aafbf14a94d6dba877a",
    },
  ]);

  const messages = await Message.find();
  res.send(messages);
});

app.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://MartinApiwat:Martin123@cluster0.rigswq4.mongodb.net/?retryWrites=true&w=majority"
  );
});
