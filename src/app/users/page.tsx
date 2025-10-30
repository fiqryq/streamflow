'use client'

import { AuthenticatedLayout } from '@/components/AuthenticatedLayout'

export default function UsersPage() {
  return (
    <AuthenticatedLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-400 mt-2">Manage users and permissions</p>
        </div>

        <div className="bg-dark-800 rounded-lg border border-gray-700 p-6">
          <div className="text-center py-12">
            <i className="ti ti-users text-6xl text-gray-600 mb-4"></i>
            <p className="text-gray-400">User management page - Implementation in progress</p>
            <p className="text-gray-500 text-sm mt-2">This page needs to be migrated from the Express version</p>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
