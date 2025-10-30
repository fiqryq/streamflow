'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { MobileNav } from './MobileNav'

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex">
      <Sidebar />
      <MobileNav />
      <div className="w-full lg:ml-20 flex flex-col min-h-screen">
        <TopBar />
        <div className="p-6 pt-20 lg:pt-22 flex-1">{children}</div>
        <div className="hidden lg:flex justify-end pr-6 py-4">
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">
              StreamFlow <span className="text-xs font-medium bg-gray-700 px-1 rounded">v2.1</span>
            </div>
            <div className="h-3 w-px bg-gray-700"></div>
            <a href="https://youtube.com/@bangtutorial" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:underline">
              by Bang Tutorial
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
