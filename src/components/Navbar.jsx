import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex flex-row gap-x-2 absolute left-1/2 transform -translate-x-1/2 bottom-6'>
        <Link href="/" className='bg-blue-600 text-white font-semibold p-2 rounded-md text-xs w-[100px] flex items-center text-center'> Inicio de aplicacion </Link>
        <Link href="/register" className='bg-blue-600 text-white font-semibold p-2 rounded-md text-xs w-[100px] flex items-center text-center'> Registro </Link>
        <Link href="/login" className='bg-blue-600 text-white font-semibold p-2 rounded-md text-xs w-[100px] flex items-center text-center'> Logueo </Link>
        <Link href="/dashboard" className='bg-blue-600 text-white font-semibold p-2 rounded-md text-xs w-[100px] flex items-center text-center'> Home </Link>
        <Link href="/logout" className='bg-blue-600 text-white font-semibold p-2 rounded-md text-xs w-[100px] flex items-center text-center'>  Desloguear </Link>
    </nav>
  )
}

export default Navbar