import express from "express";
const router = express.Router();
export default router;

import { createPlaylist, getPlaylistById, getPlaylists, } from "#db/queries/playlists.js";
import { getTracksByPlaylistId } from "#db/queries/tracks.js";

router.routes("/").get(async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists)
})
.post(async (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Name and description are required.",
        });
    }

    const { name, description } = req.body;
    if(!name || !description) 
        return res.status(400).send({
            error: "Bad Request",
            message: "Name and description are required.",
        });

        const playlist = await createPlaylist(name, description);
        res.status(201).send(playlist);
});

router.param ("id", async (req, res, next, id) => {
    const playlist = await getPlaylistById(id);
    if (!playlist) {
        return res.status(404).json({
            error: "Not Found",
            message: `Playlist with id ${id} not found.`,
        });
    }
    req.playlist = playlist;
    next();
});

router.route("/:id/tracks").get(async (req, res) => {
    const tracks = await getTracksByPlaylistId(req.playlists.id);
    res.send(tracks);
})
.post(async (req, res) => {
    if (!req.body.trackId) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Track ID is required.",
        });
    }

    const { trackId } = req.body;
    if (!trackId) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Track ID is required.",
        });
    }
    const playlistTrack = await createPlaylistTrack(req.playlist.id, trackId);
    res.status(201).send(playlistTrack);
});
