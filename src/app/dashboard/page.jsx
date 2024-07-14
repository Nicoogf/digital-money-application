'use client'
import { useAuth } from '@/context/AuthContext'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCard } from '@/context/CardContext'
import { tacharNumero } from '@/utils/tacharNumero'

const Dashboard = () => {

  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
  console.log("El usuario es: ", user, "¿Está cargando? :", loading)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])



  if (loading) return <h1>La página está cargando</h1>
  
  return (
    <div>
      <h1> Ingresaste al perfil de </h1>
      <h2> {user.name} - {user.alias}</h2>
      <section>
        <p> $ { user.dinero }</p>
        <Link  href="/cards" className='bg-slate-700 p-2 rounded-md text-white'> Ver tarjetas </Link>
      </section>
      <Link href = "/add-card" className='text-blue-500 decoration-slice'> Agregar Targeta </Link>
    </div>
  )
}

export default Dashboard