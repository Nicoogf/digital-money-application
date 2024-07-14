'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

  const { isAuthenticated , logout} = useAuth()
  return (
    <nav className={` ${isAuthenticated ? "flex flex-row gap-x-2 absolute bottom-0 w-full bg-blue-800 items-center justify-center": "hidden" }`}>
        <Link href="/" className='bg-blue-600 text-white font-semibold p-2 rounded-md text-xs w-[100px] flex items-center justify-center text-center'> Inicio</Link>
        <Link href="/register" className='bg-blue-600 text-white font-semibold p-2 rounded-md text-xs w-[100px] flex items-center  justify-cente text-center'> Registro </Link>
        <Link href="/login" className='bg-blue-600 text-white font-semibold p-2 rounded-md text-xs w-[100px] flex items-center text-center justify-center'> Logueo </Link>
        <Link href="/dashboard" className='bg-blue-600 text-white font-semibold p-2 rounded-md text-xs w-[100px] flex items-center text-center justify-center'> Home </Link>
        <Link href="/login" className='bg-blue-600 text-white font-semibold p-2 rounded-md text-xs w-[100px] flex items-center text-center justify-center' onClick={logout}>  Desloguear </Link>
    </nav>
  )
}

export default Navbar