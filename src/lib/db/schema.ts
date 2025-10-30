import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  avatarPath: text('avatar_path'),
  gdriveApiKey: text('gdrive_api_key'),
  userRole: text('user_role').default('admin').notNull(),
  status: text('status').default('active').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Videos table
export const videos = sqliteTable('videos', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  filepath: text('filepath').notNull(),
  thumbnailPath: text('thumbnail_path'),
  fileSize: integer('file_size'),
  duration: real('duration'),
  format: text('format'),
  resolution: text('resolution'),
  bitrate: integer('bitrate'),
  fps: text('fps'),
  userId: text('user_id').notNull().references(() => users.id),
  uploadDate: text('upload_date').default(sql`CURRENT_TIMESTAMP`),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Streams table
export const streams = sqliteTable('streams', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  videoId: text('video_id').references(() => videos.id),
  rtmpUrl: text('rtmp_url').notNull(),
  streamKey: text('stream_key').notNull(),
  platform: text('platform'),
  platformIcon: text('platform_icon'),
  bitrate: integer('bitrate').default(2500).notNull(),
  resolution: text('resolution'),
  fps: integer('fps').default(30).notNull(),
  orientation: text('orientation').default('horizontal').notNull(),
  loopVideo: integer('loop_video', { mode: 'boolean' }).default(1).notNull(),
  scheduleTime: text('schedule_time'),
  duration: integer('duration'),
  status: text('status').default('offline').notNull(),
  statusUpdatedAt: text('status_updated_at'),
  startTime: text('start_time'),
  endTime: text('end_time'),
  useAdvancedSettings: integer('use_advanced_settings', { mode: 'boolean' }).default(0).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  userId: text('user_id').notNull().references(() => users.id),
});

// Stream history table
export const streamHistory = sqliteTable('stream_history', {
  id: text('id').primaryKey(),
  streamId: text('stream_id').references(() => streams.id),
  title: text('title').notNull(),
  platform: text('platform'),
  platformIcon: text('platform_icon'),
  videoId: text('video_id').references(() => videos.id),
  videoTitle: text('video_title'),
  resolution: text('resolution'),
  bitrate: integer('bitrate'),
  fps: integer('fps'),
  startTime: text('start_time'),
  endTime: text('end_time'),
  duration: integer('duration'),
  useAdvancedSettings: integer('use_advanced_settings', { mode: 'boolean' }).default(0).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  userId: text('user_id').notNull().references(() => users.id),
});

// Playlists table
export const playlists = sqliteTable('playlists', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  isShuffle: integer('is_shuffle', { mode: 'boolean' }).default(0).notNull(),
  userId: text('user_id').notNull().references(() => users.id),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Playlist videos junction table
export const playlistVideos = sqliteTable('playlist_videos', {
  id: text('id').primaryKey(),
  playlistId: text('playlist_id').notNull().references(() => playlists.id, { onDelete: 'cascade' }),
  videoId: text('video_id').notNull().references(() => videos.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Type exports for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;

export type Stream = typeof streams.$inferSelect;
export type NewStream = typeof streams.$inferInsert;

export type StreamHistory = typeof streamHistory.$inferSelect;
export type NewStreamHistory = typeof streamHistory.$inferInsert;

export type Playlist = typeof playlists.$inferSelect;
export type NewPlaylist = typeof playlists.$inferInsert;

export type PlaylistVideo = typeof playlistVideos.$inferSelect;
export type NewPlaylistVideo = typeof playlistVideos.$inferInsert;
