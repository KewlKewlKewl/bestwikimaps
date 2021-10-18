-- Drop and recreate Maps table

DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id VARCHAR(32) PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, --ERR insert or update on table "maps" violates foreign key constraint "maps_user_id_fkey"
  preview_image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP
);
