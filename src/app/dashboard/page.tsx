'use client'

import { AuthenticatedLayout } from '@/components/AuthenticatedLayout'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface Stream {
  id: string
  title: string
  platform: string
  status: string
  video_title?: string
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [streams, setStreams] = useState<Stream[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStreams()
  }, [])

  const fetchStreams = async () => {
    try {
      const response = await fetch('/api/streams')
      if (response.ok) {
        const data = await response.json()
        setStreams(data.streams || [])
      }
    } catch (error) {
      console.error('Error fetching streams:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthenticatedLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Stream Manager</h1>
          <p className="text-gray-400 mt-2">Manage your live streams</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-dark-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Streams</p>
                <p className="text-3xl font-bold mt-2">{streams.filter(s => s.status === 'live').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <i className="ti ti-broadcast text-green-500 text-2xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Scheduled</p>
                <p className="text-3xl font-bold mt-2">{streams.filter(s => s.status === 'scheduled').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <i className="ti ti-calendar text-blue-500 text-2xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Streams</p>
                <p className="text-3xl font-bold mt-2">{streams.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <i className="ti ti-list text-purple-500 text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Streams</h2>
            <button className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors">
              <i className="ti ti-plus mr-2"></i>
              New Stream
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading streams...</p>
            </div>
          ) : streams.length === 0 ? (
            <div className="text-center py-12">
              <i className="ti ti-broadcast text-6xl text-gray-600 mb-4"></i>
              <p className="text-gray-400">No streams yet. Create your first stream to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {streams.map((stream) => (
                <div key={stream.id} className="bg-dark-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{stream.title}</h3>
                      {stream.video_title && <p className="text-sm text-gray-400 mt-1">{stream.video_title}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        stream.status === 'live' ? 'bg-green-500/20 text-green-500' :
                        stream.status === 'scheduled' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-gray-500/20 text-gray-500'
                      }`}>
                        {stream.status}
                      </span>
                      <button className="p-2 hover:bg-dark-600 rounded-lg transition-colors">
                        <i className="ti ti-dots-vertical text-gray-400"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
