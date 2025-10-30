'use client'

export function TopBar() {
  return (
    <div className="hidden lg:fixed lg:flex top-0 right-0 left-20 items-center justify-end h-14 px-6 bg-dark-800 shadow-md z-10">
      <a
        href="https://github.com/bangtutorial/streamflow"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-400 hover:text-white transition-colors mr-2"
      >
        <i className="ti ti-brand-github text-lg"></i>
      </a>
      <div className="relative">
        <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
          <i className="ti ti-bell text-lg"></i>
        </button>
      </div>
    </div>
  )
}
