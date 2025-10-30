import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { streams } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userStreams = await db
      .select()
      .from(streams)
      .where(eq(streams.userId, session.user.id))
      .orderBy(streams.createdAt)

    return NextResponse.json({ success: true, streams: userStreams })
  } catch (error) {
    console.error('Error fetching streams:', error)
    return NextResponse.json({ error: 'Failed to fetch streams' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const { v4: uuidv4 } = require('uuid')
    const streamId = uuidv4()

    const newStream = await db.insert(streams).values({
      id: streamId,
      title: body.streamTitle,
      videoId: body.videoId || null,
      rtmpUrl: body.rtmpUrl,
      streamKey: body.streamKey,
      platform: body.platform || 'Custom',
      platformIcon: body.platformIcon || 'ti-broadcast',
      bitrate: body.bitrate || 2500,
      resolution: body.resolution || '1280x720',
      fps: body.fps || 30,
      orientation: body.orientation || 'horizontal',
      loopVideo: body.loopVideo === 'true' || body.loopVideo === true,
      scheduleTime: body.scheduleTime || null,
      duration: body.duration || null,
      status: body.scheduleTime ? 'scheduled' : 'offline',
      useAdvancedSettings: body.useAdvancedSettings === 'true' || body.useAdvancedSettings === true,
      userId: session.user.id,
    }).returning()

    return NextResponse.json({ success: true, stream: newStream[0] })
  } catch (error) {
    console.error('Error creating stream:', error)
    return NextResponse.json({ error: 'Failed to create stream' }, { status: 500 })
  }
}
