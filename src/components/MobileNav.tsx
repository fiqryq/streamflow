'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'

export function MobileNav() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [showProfilePopup, setShowProfilePopup] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-dark-800 shadow-lg flex items-center justify-between px-4 z-30">
        <div className="flex items-center">
          <Image src="/images/logo_mobile.svg" alt="StreamFlow Logo" width={128} height={32} className="h-8" />
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
            <i className="ti ti-bell text-lg"></i>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-gray-700 shadow-lg z-30">
        <nav className="flex justify-around items-center h-16">
          <Link href="/dashboard" className={`bottom-nav-item ${isActive('/dashboard') ? 'bottom-nav-active' : ''}`}>
            <i className="ti ti-broadcast"></i>
            <span>Streams</span>
          </Link>
          <Link href="/gallery" className={`bottom-nav-item ${isActive('/gallery') ? 'bottom-nav-active' : ''}`}>
            <i className="ti ti-video"></i>
            <span>Gallery</span>
          </Link>
          <Link href="/playlist" className={`bottom-nav-item ${isActive('/playlist') ? 'bottom-nav-active' : ''}`}>
            <i className="ti ti-playlist"></i>
            <span>Playlist</span>
          </Link>
          <Link href="/history" className={`bottom-nav-item ${isActive('/history') ? 'bottom-nav-active' : ''}`}>
            <i className="ti ti-history"></i>
            <span>History</span>
          </Link>
          <button onClick={() => setShowProfilePopup(!showProfilePopup)} className="bottom-nav-item">
            <div className="relative">
              <div className="w-6 h-6 rounded-full overflow-hidden mx-auto">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image src="/images/default-avatar.jpg" alt="Default Profile" width={24} height={24} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
            <span>Profile</span>
          </button>
        </nav>

        {/* Mobile Profile Popup */}
        {showProfilePopup && (
          <div className="fixed bottom-16 right-2 bg-dark-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden w-40 z-40">
            <div className="py-2 px-3">
              <div className="text-sm font-medium mb-1">{session?.user?.name || 'User'}</div>
              <div className="text-xs text-gray-400 mb-2">{session?.user?.email || ''}</div>
              <div className="h-px bg-gray-700 my-2"></div>
              {session?.user?.role === 'admin' && (
                <Link href="/users" className="flex items-center py-2 text-gray-300 hover:text-white text-sm">
                  <i className="ti ti-users mr-2"></i>
                  <span>Users</span>
                </Link>
              )}
              <Link href="/settings" className="flex items-center py-2 text-gray-300 hover:text-white text-sm">
                <i className="ti ti-settings mr-2"></i>
                <span>Settings</span>
              </Link>
              <div className="h-px bg-gray-700 my-2"></div>
              <Link href="/api/auth/signout" className="flex items-center py-2 text-red-400 hover:text-red-300 text-sm">
                <i className="ti ti-logout mr-2"></i>
                <span>Sign Out</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
