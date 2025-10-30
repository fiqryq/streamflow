'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

export function Sidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <>
      <div className="hidden lg:flex lg:fixed lg:flex-col w-20 h-screen pt-2 bg-dark-800 shadow-lg overflow-hidden">
        <div className="flex items-center justify-center h-14 w-14 mx-auto mb-4">
          <Image src="/images/logo.svg" alt="StreamFlow Logo" width={36} height={36} />
        </div>
        <div className="flex-1">
          <Link href="/dashboard" className={`sidebar-icon group ${isActive('/dashboard') ? 'bg-primary' : ''}`}>
            <i className="ti ti-broadcast text-xl"></i>
            <span className="text-xs mt-1">Streams</span>
            <span className="sidebar-tooltip group-hover:scale-100">Stream Manager</span>
          </Link>
          <Link href="/gallery" className={`sidebar-icon group ${isActive('/gallery') ? 'bg-primary' : ''}`}>
            <i className="ti ti-video text-xl"></i>
            <span className="text-xs mt-1">Gallery</span>
            <span className="sidebar-tooltip group-hover:scale-100">Video Gallery</span>
          </Link>
          <Link href="/playlist" className={`sidebar-icon group ${isActive('/playlist') ? 'bg-primary' : ''}`}>
            <i className="ti ti-playlist text-xl"></i>
            <span className="text-xs mt-1">Playlist</span>
            <span className="sidebar-tooltip group-hover:scale-100">Playlist Manager</span>
          </Link>
          <Link href="/history" className={`sidebar-icon group ${isActive('/history') ? 'bg-primary' : ''}`}>
            <i className="ti ti-history text-xl"></i>
            <span className="text-xs mt-1">History</span>
            <span className="sidebar-tooltip group-hover:scale-100">Stream History</span>
          </Link>
          {session?.user?.role === 'admin' && (
            <Link href="/users" className={`sidebar-icon group ${isActive('/users') ? 'bg-primary' : ''}`}>
              <i className="ti ti-users text-xl"></i>
              <span className="text-xs mt-1">Users</span>
              <span className="sidebar-tooltip group-hover:scale-100">User Management</span>
            </Link>
          )}
        </div>
        <div className="mt-auto">
          <div className="h-px bg-gray-700 w-full"></div>
          <div className="relative">
            <div className="h-20 flex items-center justify-center px-3 py-4 hover:bg-dark-700/50 transition-colors">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-gray-700 hover:ring-primary transition-all"
              >
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image src="/images/default-avatar.jpg" alt="Default Profile" width={48} height={48} className="w-full h-full object-cover" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Dropdown */}
      {showProfileMenu && (
        <div className="fixed bg-dark-800 shadow-xl border border-gray-700 rounded-lg bottom-20 left-4 z-[100] min-w-[220px]">
          <div className="px-4 py-2 border-b border-gray-700">
            <div className="font-medium">{session?.user?.name || 'User'}</div>
          </div>
          <Link
            href="/settings"
            className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-dark-700 hover:text-white transition-colors"
          >
            <i className="ti ti-settings mr-3"></i>
            <span>Settings</span>
          </Link>
          <a
            href="https://github.com/bangtutorial/streamflow/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-dark-700 hover:text-white transition-colors"
          >
            <i className="ti ti-help mr-3"></i>
            <span>Help & Support</span>
          </a>
          <div className="h-px bg-gray-700 mx-4"></div>
          <Link href="/api/auth/signout" className="flex items-center px-4 py-2.5 text-sm text-logout hover:bg-dark-700 transition-colors">
            <i className="ti ti-logout mr-3"></i>
            <span>Sign Out</span>
          </Link>
        </div>
      )}
    </>
  )
}
