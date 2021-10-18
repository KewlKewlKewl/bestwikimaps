-- Drop and recreate Favourites table

DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE favourites (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id VARCHAR(32) REFERENCES maps(id) ON DELETE CASCADE
);
