'use client'
import { useAuth } from '@/context/AuthContext'
import { useCard } from '@/context/CardContext'
import { tacharNumero } from '@/utils/tacharNumero'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const CardPage = () => {
    const router = useRouter()
    const { user, loading, isAuthenticated } = useAuth()
    const { getCards, cards } = useCard()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
          router.push("/login")
        }
      }, [loading, isAuthenticated, router])

      
    useEffect(() => {
        getCards()
    }, [])

    if (loading) return <h1>La página está cargando</h1>
   

    return (
        <main className='relative flex flex-col items-center justify-center h-screen '>
            <section>
                <h5> Lista de Tarjetas agregadas</h5>
                <section className='flex flex-row gap-x-4'>

                    { cards.length === 0 ? 
                    <h5> No hay tarjetas ingresadas</h5> :  
                    cards.map((card, i) => (
                        <article key={i} className='bg-red-400 rounded-lg w-[200px] py-4 '>
                            {card.name}
                            <p> {tacharNumero(card.serial)} </p>
                        </article>
                    ))}
                    <Link href="/add-card" className='text-blue-500'> Agregar Tarjeta </Link>
                   
                </section>
              </section>
        </main>
    )
}

export default CardPage

//3:49