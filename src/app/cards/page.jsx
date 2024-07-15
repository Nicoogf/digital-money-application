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
    const { getCards, cards , deleteCard } = useCard()

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
            <section className=''>
                <h5> Lista de Tarjetas agregadas</h5>
                <section className='flex flex-row gap-x-4 w-[350px] overflow-x-scroll scrolling bg-violet-300 p-4'>

                    { cards.length === 0 ? 
                    <h5> No hay tarjetas ingresadas</h5> :  
                    cards.map((card, i) => (
                        <article key={i} className='bg-red-400 rounded-lg w-[350px]'>
                            {card.name}
                            <p> {tacharNumero(card.serial)} </p>
                            <div className='flex flex-row'>
                                <button className='bg-lime-700 p-2 rounded-md text-white gap-x-2'>
                                    Editar
                                </button>
                                 <button onClick={()=> {deleteCard(card._id)}}
                                 className='bg-lime-700 p-2 rounded-md text-white'>
                                    Eliminar
                                </button>
                            </div>
                        </article>
                    ))}                  
                   
                </section>
                <Link href="/add-card" className='text-blue-500'> Agregar Tarjeta </Link>
              </section>
        </main>
    )
}

export default CardPage

//3:49