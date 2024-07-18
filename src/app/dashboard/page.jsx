'use client'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


import React, { useEffect } from 'react'

const DashboarPage = () => {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
  console.log(user)

  useEffect(() => {
    if (!loading && !isAuthenticated && !user) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  return (
    <>
       <h3 className='w-[80%] max-w-[595px] mx-auto my-6 font-semibold text-lg'> Bienvenido , {user?.name} a Digital Money </h3>

      <section className=' w-[80%] max-w-[595px] mx-auto bg-gray-800 rounded-md p-4 mt-2'>

        <div className=' flex flex-row justify-end gap-x-4 mr-4 p-2 '>
          <Link href="/dashboard/cards"> Ver tarjetas </Link>
          <Link href="/cards"> Ver CVU </Link>
        </div>

        <div className="ml-4 -mt-3">
          <h3 className='text-sm'> Dinero disponible </h3>
          <p className='text-4xl font-bold'> $ {user?.dinero}</p>
        </div>

      </section>


      <section className='flex flex-col gap-y-2 mt-4 w-[80%] max-w-[595px]  mx-auto py-4'>
        <Link href="/dashboard/send" className='bg-lime-500 py-3 text-lime-950 font-semibold rounded-md text-center'> Transferir dinero </Link>
        <Link href="/dashboard/services" className='bg-lime-500 py-3 text-lime-950 font-semibold rounded-md text-center'> Pagar Servicios  </Link>
        <Link href="/dashboard/deposit" className='bg-lime-500 py-3 text-lime-950 font-semibold rounded-md text-center'> Ingresar Dinero  </Link>
      </section>

      <section className='w-[80%] max-w-[595px] mx-auto'>


       <section>
          <input placeholder="Buscar por actividad " className='bg-gray-700 block w-full mx-auto mt-4 text-lime-500 p-2 outline-none rounded-md' />

          <div >
            <h4 className='font-bold my-2'> Tu actividad </h4>

            <section className='w-full h-[260px] rounded-md p-2 flex flex-col gap-4 overflow-hidden overflow-y-scroll'>

              <article className='flex flex-row justify-between items-center bg-gray-700 p-2 rounded-md'>
                <div className='flex flex-row items-center gap-x-2'>
                  <h4 className='bg-lime-500 py-1 px-2 rounded-xl'> TC </h4>
                  <h4> Tito calderon</h4>
                </div>
                <h4> $ 2,548 </h4>

              </article>

              <article className='flex flex-row justify-between items-center bg-gray-700 p-2 rounded-md'>
                <div className='flex flex-row items-center gap-x-2'>
                  <h4 className='bg-lime-500 py-1 px-2 rounded-xl'> TC </h4>
                  <h4> Tito calderon</h4>
                </div>
                <h4> $ 2,548 </h4>

              </article>

              <article className='flex flex-row justify-between items-center bg-gray-700 p-2 rounded-md'>
                <div className='flex flex-row items-center gap-x-2'>
                  <h4 className='bg-lime-500 py-1 px-2 rounded-xl'> TC </h4>
                  <h4> Tito calderon</h4>
                </div>
                <h4> $ 2,548 </h4>

              </article>

              <article className='flex flex-row justify-between items-center bg-gray-700 p-2 rounded-md'>
                <div className='flex flex-row items-center gap-x-2'>
                  <h4 className='bg-lime-500 py-1 px-2 rounded-xl'> TC </h4>
                  <h4> Tito calderon</h4>
                </div>
                <h4> $ 2,548 </h4>

              </article>

              <article className='flex flex-row justify-between items-center bg-gray-700 p-2 rounded-md'>
                <div className='flex flex-row items-center gap-x-2'>
                  <h4 className='bg-lime-500 py-1 px-2 rounded-xl'> TC </h4>
                  <h4> Tito calderon</h4>
                </div>
                <h4> $ 2,548 </h4>

              </article>


            </section>


          </div>
          <Link href="/" className='text-sm block w-[80%] mx-auto mt-4 text-end text-blue-400'> Ver toda la actividad </Link>
       </section>

      </section>
    </>
  )
}

export default DashboarPage