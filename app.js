import express from "express";
const app = express();
export default app;


import tracksRouter from "#api/playlists.js";
import playlistsRouter from "#api/playlists.js";

app.use(express.json());
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.use(( err, req, res, next) => {
    console.error(err);
        res.status(500).json({ 
            error: "Internal Server Error",
            message: err.message,
        });
    });
q