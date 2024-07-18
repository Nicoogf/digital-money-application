'use client'
import { useAuth } from '@/context/AuthContext'
import { useCard } from '@/context/CardContext'
import { tacharNumero } from '@/utils/tacharNumero'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrLinkNext } from "react-icons/gr";

const CardPage = () => {
    const router = useRouter()
    const { user, loading, isAuthenticated } = useAuth()
    const { getCards, cards, deleteCard } = useCard()

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
        <>
            <Link 
            href="/dashboard/add-card"className=' w-[80%] max-w-[575px] mx-auto bg-gray-800 rounded-md p-4 mt-2 flex flex-row items-center justify-around py-10'>
                <div className='flex flex-row items-center gap-x-2'>
                    <IoMdAddCircleOutline className='text-lime-500 text-3xl' />
                    <h6 className='text-lime-500'> Nueva Tarjeta </h6>
                </div>
                <GrLinkNext className='text-lime-500 text-3xl'/>



            </Link>
            <section className='w-[95%] max-w-[575px] mx-auto'>

                <h5 className='my-6'> Tus Tarjetas </h5>
                <section className='flex flex-col gap-x-4 p-4 h-[450px]'>

                    {cards.length === 0 ?
                        <h5> No hay tarjetas ingresadas</h5> :
                        cards.map((card, i) => (
                            <article key={i} className='bg-gray-700 rounded-lg flex flex-row items-center justify-between px-6 py-4 w-full'>
                                <div className='flex flex-row justify-between items-center gap-x-2'>
                                <div className='w-4 h-4 bg-lime-500 rounded-full' />
                                <h6> {card.name} </h6>
                                <p> {tacharNumero(card.serial)} </p>
                                </div>
                                
                                <div className='flex flex-row'>
                                    <Link href={`/cards/${card._id}`} className='p-2 rounded-md text-blue-500 gap-x-2'>
                                        Editar
                                    </Link>
                                    <button onClick={() => { deleteCard(card._id) }}
                                        className='p-2 rounded-md text-blue-500'>
                                        Eliminar
                                    </button>
                                </div>
                            </article>
                        ))}

                </section>
               
            </section>
        </>
    )
}
export default CardPage