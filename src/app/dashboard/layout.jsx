'use client'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Logo from "../../../public/logoverde.png"

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

const LayoutPage = ({ children }) => {

  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
  console.log("El usuario es: ", user, "¿Está cargando? :", loading)

  useEffect(() => {
    if (!loading && !isAuthenticated && !user) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])


  if (loading) return <h1>La página está cargando</h1>

  return (
    <section className='grid grid-cols-12 grid-auto-flow  h-[calc(100vh-40px)] relative overflow-hidden'>

      <nav className='bg-gray-950 w-full px-2 py-3 flex flex-row items-center justify-between mb-2 absolute top-0'>
        <Image src={Logo} className='w-14 ' alt="Logo de digital money app" />
        <div className='flex  flex-row items-center gap-x-2'>
          <div className='bg-lime-500 rounded-xl px-2 py-1 '>
            TC
          </div>
          <h2 className='text-sm text-lime-400 font-semibold'> Hola ,</h2>
          <h3 className='text-sm text-lime-400 font-semibold'>  {user?.name}  {user?.lastname} </h3>
        </div>
      </nav>



      <nav className='hidden col-span-0 md:flex md:flex-col md:col-span-4 lg:col-span-3 xl:col-span-2 bg-lime-500  gap-y-2 p-10 text-lime-950 font-semibold mt-14'>
        <Link href="/dashboard"> Inicio </Link>
        <Link href="/dashboard/movements"> Actividad </Link>
        <Link href="/dashboard/profile"> Tu Perfil </Link>
        <Link href="/dashboard/deposit"> Cargar Dinero </Link>
        <Link href="/dashboard/servicios"> Pagar Servicio </Link>
        <Link href="/dashboard/cards"> Tarjetas </Link>
        <Link href="/"> Cerrar Sesion </Link>
      </nav>

      <div className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-7 2xl:col-span-8 mt-14 ">
        {children}
      </div>

      <div className='bg-gray-900 hidden xl:grid xl:col-span-3 mt-14 2xl:col-span-2 border-l border-gray-700'>
        a
      </div>

      <footer className='bg-gray-700 absolute bottom-0 w-full p-2 hidden md:block text-lime-500'>
       Digital Money App 2024
      </footer>

      <Navbar />
    </section>

  )
}

export default LayoutPage