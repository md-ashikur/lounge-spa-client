import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='grid grid-cols-5'>
      {/* Sidebar */}
      <div className=" h-screen fixed bg-gray-800 text-white p-4 z-50">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/dashboard">
                <p className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</p>
              </Link>
            </li>
            <li>
              <Link href="/users">
                <p className="block py-2 px-4 hover:bg-gray-700 rounded">Users</p>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <p className="block py-2 px-4 hover:bg-gray-700 rounded">Settings</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className='col-span-3 h-screen z-50'>
        sdf sdfffffffffffff
      </div>
    </div>
  )
}
