import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/playlists.js";

router.route("/").get(async (req, res) => {
    const tracks = await getTracks();
    res.send(tracks);
})
router.route("/:id").get(async (req, res) => {
    const track = await getTrackById(req.params.id);
    if (!track) {
        return res.status(404).json({
            error: "Not Found",
            message: `Track with id ${req.params.id} not found.`,
        });
    }
    res.send(track);
})