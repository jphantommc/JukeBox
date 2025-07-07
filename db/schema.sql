-- TODO
DROP TABLE IF EXSISTS playlists_tracks;
DROP TABLE IF EXSISTS playlists;
DROP TABLE IF EXISTS tracks;

CREATE TABLE tracks (
    id serial PRIMARY KEY,
    name text NOT NULL,
    duration_ms integer NOT NULL,
);

CREATE TABLE playlists (
    id serial PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL,
);

CREATE TABLE playlists_tracks (
    playlist_id integer NOT NULL,
    track_id integer NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE,
    FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE,
    PRIMARY KEY (playlist_id, track_id)
);