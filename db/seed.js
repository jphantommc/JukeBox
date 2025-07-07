import db from "#db/client";
import { createPlaylist } from "#db/queries/playlists.js";
import { CreatePlaylistTrack } from "#db/queries/playlistTracks.js";
import { createTrack } from "#db/queries/tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " +i, i * 30000); 
    await createPlaylist("Playlist " + i, "This Playlist is call...");
  }
  for (let i = 1; i <= 10; i++) {
    const playlistId = 1 + Math.floor(i / 2);
    await CreatePlaylistTrack(playlistId, i);
  }
} 
