"use client"


import { useTransaction } from '@/context/TransContext'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ServicesPage  = () => {

  const { business , getBusiness} = useTransaction()
  console.log(business)


  useEffect(() => {
    getBusiness()
  },[])

  return (
    <section className='mt-8'>
      <input placeholder='Buscar entre todas las empresas registradas en nuestra Plataforma' className=' w-[80%] mx-auto block'/> 

      <section className='bg-slate-700 w-[80%] mx-auto grid grid-cols-12 gap-2 justify-start'>

      { business?.map((busin ,i) => (
        <Link key={i} className='col-span-6 bg-red-500' href={`/dashboard/servicios/${busin?._id}`}> 
        <p className='text-center '> { busin?.companyName }</p> 
        <p> { busin?.businessField} </p>
        </Link>
      ))}

      </section>
    </section>
  )
}

export default ServicesPage
