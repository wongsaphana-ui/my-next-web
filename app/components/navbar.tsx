import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    
    <nav className='flex justify-between items-center bg-white border-b border-gray-100 p-4 px-6 sticky top-0 z-50 shadow-sm'>
      
      
      <div className='font-bold text-xl text-indigo-600 tracking-wide'>
        <Link href="/">เฮียเติ้ล</Link>
      </div>

      
      <div className='flex gap-6 items-center text-sm font-medium text-gray-600'>
        <Link href="/" className='hover:text-indigo-600 transition-colors'>
          Home
        </Link>
        <Link href="/Profile" className='hover:text-indigo-600 transition-colors'>
          Profile
        </Link>
        
        
        <Link 
          href="/Logout" 
          className='bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors text-xs font-semibold'
        >
          Logout
        </Link>
      </div>

    </nav>
  )
}

export default Navbar