import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

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
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("messages", messageSchema);

app.get("/channels/:id", async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  const messages = await Message.find({ channelId: req.params.id }).sort({
    createdAt: "desc",
  });
  res.send({ channel: channel, messages: messages });
});

app.post("/channels/:id", async (req, res) => {
  await Message.create({
    text: req.body.text,
    user: {
      name: req.body.username,
      image: "https://api.dicebear.com/5.x/micah/svg?seed=" + req.body.username,
    },
    channelId: req.params.id,
  });
  res.send("OK");
});

app.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://MartinApiwat:Martin123@cluster0.rigswq4.mongodb.net/?retryWrites=true&w=majority"
  );
});
