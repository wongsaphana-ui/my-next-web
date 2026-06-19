import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    // เพิ่มพื้นหลังขาว, เงาบางๆ, และตรึงไว้ด้านบน (Sticky)
    <nav className='flex justify-between items-center bg-white border-b border-gray-100 p-4 px-6 sticky top-0 z-50 shadow-sm'>
      
      {/* ฝั่งซ้าย: โลโก้หรือชื่อเว็บ */}
      <div className='font-bold text-xl text-indigo-600 tracking-wide'>
        <Link href="/">MySpace</Link>
      </div>

      {/* ฝั่งขวา: กลุ่มเมนูลิงก์ */}
      <div className='flex gap-6 items-center text-sm font-medium text-gray-600'>
        <Link href="/" className='hover:text-indigo-600 transition-colors'>
          Home
        </Link>
        <Link href="/Profile" className='hover:text-indigo-600 transition-colors'>
          Profile
        </Link>
        
        {/* เมนู Logout แยกดีไซน์ให้เหมือนปุ่มเพื่อให้เด่นและกดง่าย */}
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