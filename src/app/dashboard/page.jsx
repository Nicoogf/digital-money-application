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
  // console.log("El usuario es: ", user, "¿Está cargando? :", loading)
  const{ getCards , cards} = useCard()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  useEffect(() => {
    getCards()
  },[])

  if (loading) return <h1>La página está cargando</h1>
  
  return (
    <div>
      <h1> Ingresaste al perfil de </h1>
      <h2> {user.name} - {user.alias}</h2>
      <section>
        <h5> Lista de Tarjetas agregadas</h5>
        <section className='flex flex-row gap-x-4'>
          {
            cards.map( (card , i ) => (
              <article key={i} className='bg-red-400 rounded-lg w-[100px]'>
                  {card.name }
                  <p> { tacharNumero( card.serial) } </p>
              </article>
            ) )
          }
        </section>
      </section>
      <Link href = "/dashboard/add-card" className='text-blue-500 decoration-slice'> Agregar Targeta </Link>
    </div>
  )
}

export default Dashboard