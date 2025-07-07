import db from "#db/client";

export async function createPlaylist(name, description) {
    const sql = `
        INSERT INTO playlists (name, description)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const {
        rows: [playlsit],
    } = await db.query(sql, [name, description]);
    return playlsit;
}

export async function getPlaylists() { 
    const sql = `
    SELECT * FROM playlists `;
    const { rows: playlists } = await db.query(sql);
    return playlists;
}

export async function getPlaylistById(id) {
    const sql = `
        SELECT * FROM playlists
        WHERE id = $1;
    `;
    const { rows: [playlist] } = await db.query(sql, [id]);
    return playlist;
}

export async function createPlaylistTrack(playlistId, trackId) {
    const sql = `
        INSERT INTO playlist_tracks (playlist_id, track_id)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const { rows: [playlistTrack] } = await db.query(sql, [playlistId, trackId]);
    return playlistTrack;
}

export async function createTrack(name, durationMs) {
    const sql = `
    INSERT INTO tracks (name, duration_ms) 
    VVALUES ($1, $2)
    RETURNING *`;
    const { rows: [track], } = await db.query(sql, [name, durationMs]);
    return track;
}

export async function getTracks() {
    const sql = `
    SELECT * FROM tracks`;
    const { rows: tracks } = await db.query(sql);
    return tracks;
}


export async function getTracksByPlaylistId(playlistId) {
    const sql = `
        SELECT t.* FROM tracks 
        JOIN playlists_tracks ON playlists_tracks.track_id = tracks.id
        JOIN playlists ON playlists.id = playlists_tracks.playlist_id
        WHERE playlists.id = $1
    `;
    const { rows: tracks } = await db.query(sql, [playlistId]);
    return tracks;
}

export async function getTrackById(id) {
    const sql = `
    SELECT * FROM tracks
    WHERE id = $1;
    `;
    const { rows: tracks } = await db. query(sql, [id]);
    return tracks;
}