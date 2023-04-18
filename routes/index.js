const express = require("express");
const router = express.Router();
const channel = require("../controller/channel");
const video = require("../controller/video");
const user = require("../controller/user");
const playlist = require("../controller/playlist");

router.get("/", (req, res) =>
  res.status(200).json({ message: "welcome to blog api" })
);

router.get("/channels", channel.index);
router.get("/channels/:channel_id", channel.show);
router.post("/channels", channel.store);
router.put("/channels/:channel_id", channel.update);
router.delete("/channels/:channel_id", channel.destroy);
router.post("/channels/subscribe", channel.subscribe);
router.delete("/channels/unsubscribe", channel.unsubscribe);

router.get("/users", user.index);
router.get("/users/:user_id", user.show);
router.post("/users", user.store);
router.put("/users/:user_id", user.update);
router.delete("/users/:user_id", user.destroy);

router.get("/videos", video.index);
router.get("/videos/:video_id", video.show);
router.post("/videos", video.store);
router.put("/videos/:video_id", video.update);
router.delete("/videos/:video_id", video.destroy);

// playlist
router.get("/playlists", playlist.index);
router.get("/playlists/:id", playlist.show);
router.post("/playlists", playlist.store);
router.put("/playlists/:id", playlist.update);
router.delete("/playlists/:id", playlist.destroy);

module.exports = router;
