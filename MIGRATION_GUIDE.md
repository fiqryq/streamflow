# StreamFlow Next.js + Drizzle ORM Migration Guide

This document outlines the migration of StreamFlow from Express.js with SQLite to Next.js 15 with Drizzle ORM.

## ✅ Completed Migration Tasks

### 1. Infrastructure Setup
- ✅ Installed Next.js 15 with App Router
- ✅ Configured TypeScript
- ✅ Installed and configured Drizzle ORM with Better-SQLite3
- ✅ Set up Tailwind CSS with custom theme matching original design
- ✅ Installed NextAuth.js v5 for authentication

### 2. Database Layer
- ✅ Created Drizzle schema (`src/lib/db/schema.ts`) with all tables:
  - users
  - videos
  - streams
  - stream_history
  - playlists
  - playlist_videos
- ✅ Set up database connection (`src/lib/db/index.ts`)
- ✅ Configured Drizzle Kit for migrations

### 3. Authentication
- ✅ Set up NextAuth.js with credentials provider
- ✅ Created authentication configuration (`src/lib/auth.ts`)
- ✅ Added type definitions for NextAuth
- ✅ Created API route handler for NextAuth

### 4. Layout & Components
- ✅ Created root layout with providers
- ✅ Built Sidebar component with navigation
- ✅ Built TopBar component
- ✅ Built MobileNav component with bottom navigation
- ✅ Created AuthenticatedLayout wrapper component
- ✅ Migrated styling to Tailwind CSS

### 5. Pages
- ✅ Created login page with NextAuth integration
- ✅ Created dashboard page (basic implementation with streams list)
- ✅ Created placeholder pages for:
  - Gallery
  - Playlist
  - History
  - Settings
  - Users

### 6. API Routes
- ✅ Created basic streams API route (`/api/streams`)
  - GET: Fetch user streams
  - POST: Create new stream

### 7. Configuration
- ✅ Updated `package.json` with Next.js scripts
- ✅ Created environment variable template
- ✅ Configured Drizzle Kit
- ✅ Set up PostCSS and Tailwind

## 🚧 Pending Migration Tasks

### Critical Features

#### 1. Complete API Routes Migration
Convert all Express API routes to Next.js API routes:

- [ ] **Videos API** (`/api/videos/*`)
  - Upload video handling
  - Get all videos
  - Delete video
  - Rename video
  - Import from Google Drive

- [ ] **Streams API** (`/api/streams/*`)
  - Update stream
  - Delete stream
  - Update stream status
  - Get stream logs
  - Check stream key availability

- [ ] **Playlists API** (`/api/playlists/*`)
  - CRUD operations
  - Add/remove videos
  - Reorder videos

- [ ] **User Management API** (`/api/users/*`)
  - Update user
  - Delete user
  - Change role/status
  - Get user stats

- [ ] **History API** (`/api/history/*`)
  - Get stream history
  - Delete history entry

- [ ] **System Stats API** (`/api/system-stats`)

#### 2. File Upload Handling
- [ ] Migrate `uploadMiddleware.js` to Next.js compatible solution
- [ ] Set up Next.js file upload handling (use `next-connect` or Server Actions)
- [ ] Configure multer or alternative for large file uploads (10GB limit)
- [ ] Implement chunked upload support
- [ ] Set up TUS server integration for resumable uploads

#### 3. Complete Page Implementations

**Gallery Page:**
- [ ] Video grid display with thumbnails
- [ ] Upload button and modal
- [ ] Video player integration (Video.js)
- [ ] Delete and rename functionality
- [ ] Google Drive import integration

**Playlist Page:**
- [ ] Playlist list view
- [ ] Create playlist modal
- [ ] Edit playlist functionality
- [ ] Add/remove videos to playlist
- [ ] Drag-and-drop video reordering

**History Page:**
- [ ] Stream history table
- [ ] Filters (by date, platform, status)
- [ ] Delete history entries
- [ ] Export functionality

**Settings Page:**
- [ ] Profile settings tab
  - Username change
  - Avatar upload
- [ ] Security tab
  - Password change
- [ ] Integrations tab
  - Google Drive API key

**Users Page** (Admin only):
- [ ] User list with stats
- [ ] Create user modal
- [ ] Edit user functionality
- [ ] Activate/deactivate users
- [ ] Role management
- [ ] Delete users

**Dashboard Page - Complete Features:**
- [ ] Create stream modal with form
- [ ] Stream management (start/stop/edit/delete)
- [ ] Real-time status updates
- [ ] Schedule stream functionality
- [ ] Video/playlist selection for streams

#### 4. Services Migration

**Streaming Service** (`services/streamingService.js`):
- [ ] Port to TypeScript compatible module
- [ ] Integrate with Next.js API routes
- [ ] Maintain FFmpeg process management
- [ ] Keep stream status synchronization
- [ ] Implement real-time logging

**Scheduler Service** (`services/schedulerService.js`):
- [ ] Port to TypeScript
- [ ] Set up cron jobs for scheduled streams
- [ ] Integrate with streaming service
- [ ] Handle auto-start/stop functionality

**System Monitor** (`services/systemMonitor.js`):
- [ ] Port to TypeScript
- [ ] Create API endpoint for system stats
- [ ] Implement CPU/Memory/Network monitoring

**Video Processor** (`utils/videoProcessor.js`):
- [ ] Port FFmpeg video info extraction
- [ ] Thumbnail generation
- [ ] Metadata extraction

**Google Drive Service** (`utils/googleDriveService.js`):
- [ ] Port to TypeScript
- [ ] Implement file download with progress
- [ ] Handle authentication

#### 5. Middleware & Security
- [ ] Create middleware for authentication checks
- [ ] Implement CSRF protection for forms
- [ ] Set up rate limiting for API routes
- [ ] Add input validation for all forms
- [ ] Implement admin-only route protection

#### 6. Real-time Features
- [ ] Set up WebSocket or Server-Sent Events for:
  - Live stream status updates
  - Upload progress
  - System stats updates
  - Notifications

#### 7. Additional Features
- [ ] Service Worker migration
- [ ] PWA manifest
- [ ] Notification system (GitHub updates, stream alerts)
- [ ] Dark mode toggle (currently hardcoded)

### Testing & Optimization

- [ ] Test all authentication flows
- [ ] Test file upload (small and large files)
- [ ] Test streaming start/stop/schedule
- [ ] Performance optimization
- [ ] Error handling improvements
- [ ] Loading states for all async operations
- [ ] Optimistic UI updates

## 🏃 Quick Start

### 1. Environment Setup

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and set:

```env
PORT=7575
NEXTAUTH_URL=http://localhost:7575
NEXTAUTH_SECRET=your-secret-key-here
DATABASE_URL=./db/streamflow.db
```

Generate a secret key:

```bash
openssl rand -base64 32
```

### 2. Install Dependencies

Dependencies are already installed. If needed:

```bash
npm install
```

### 3. Run the Application

**Development mode:**

```bash
npm run dev
```

**Production build:**

```bash
npm run build
npm start
```

**Run legacy Express version:**

```bash
npm run legacy:dev
```

### 4. Database Management

**Generate migrations:**

```bash
npm run db:generate
```

**Run migrations:**

```bash
npm run db:migrate
```

**Open Drizzle Studio:**

```bash
npm run db:studio
```

## 📁 Project Structure

```
streamflow/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth routes
│   │   │   ├── streams/      # Streams API
│   │   │   └── videos/       # Videos API (to be created)
│   │   ├── dashboard/        # Dashboard page
│   │   ├── gallery/          # Gallery page
│   │   ├── login/            # Login page
│   │   ├── playlist/         # Playlist page
│   │   ├── history/          # History page
│   │   ├── settings/         # Settings page
│   │   ├── users/            # User management page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page (redirects)
│   │   ├── providers.tsx     # Session provider
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   ├── MobileNav.tsx
│   │   └── AuthenticatedLayout.tsx
│   ├── lib/                  # Utilities & configurations
│   │   ├── db/              # Database
│   │   │   ├── schema.ts    # Drizzle schema
│   │   │   └── index.ts     # DB connection
│   │   └── auth.ts          # NextAuth config
│   └── types/               # TypeScript types
│       └── next-auth.d.ts   # NextAuth type extensions
├── public/                   # Static assets (from original)
├── services/                 # Backend services (to be migrated)
├── utils/                    # Utility functions (to be migrated)
├── drizzle/                  # Drizzle migrations
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── drizzle.config.ts        # Drizzle Kit configuration
└── package.json             # Dependencies & scripts
```

## 🔄 Migration Strategy

### Phase 1: Foundation (✅ Completed)
- Set up Next.js with TypeScript
- Configure Drizzle ORM
- Set up authentication
- Create basic layout and navigation
- Migrate styling

### Phase 2: Core Features (🚧 In Progress)
- Complete all API routes
- Implement file upload
- Complete page implementations
- Port services to TypeScript

### Phase 3: Advanced Features (⏳ Pending)
- Real-time updates
- Streaming functionality
- Scheduler service
- Admin features

### Phase 4: Polish & Testing (⏳ Pending)
- Error handling
- Loading states
- Performance optimization
- Comprehensive testing

## 📚 Key Differences from Express Version

### Database Access
**Before (Express + SQLite3):**
```javascript
db.all('SELECT * FROM videos WHERE user_id = ?', [userId], callback)
```

**After (Next.js + Drizzle):**
```typescript
const videos = await db.select().from(videos).where(eq(videos.userId, userId))
```

### Authentication
**Before (Express Session):**
```javascript
req.session.userId = user.id
```

**After (NextAuth.js):**
```typescript
const session = await auth()
session.user.id
```

### API Routes
**Before (Express):**
```javascript
app.get('/api/streams', isAuthenticated, async (req, res) => {
  // handler
})
```

**After (Next.js):**
```typescript
export async function GET(request: Request) {
  const session = await auth()
  // handler
}
```

### File Structure
- EJS templates → React components
- Express routes → Next.js App Router
- Callbacks → Async/await
- CommonJS → ES Modules

## 🐛 Known Issues

1. **Image imports** need to be configured for user-uploaded content
2. **FFmpeg processes** need to be managed in Next.js environment
3. **Large file uploads** may need streaming configuration
4. **Real-time updates** need WebSocket or SSE implementation

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

To continue the migration:

1. Pick a task from the "Pending Migration Tasks" section
2. Implement the feature
3. Test thoroughly
4. Update this guide
5. Commit your changes

## 📝 Notes

- The original Express app is preserved and can be run with `npm run legacy:dev`
- All new code is TypeScript-first
- Drizzle ORM provides type-safe database access
- NextAuth.js handles authentication securely
- The migration maintains the original UI/UX design

---

**Migration Progress:** ~40% Complete

**Last Updated:** October 30, 2025
