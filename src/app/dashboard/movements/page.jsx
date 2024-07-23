'use client'
import { useTransaction } from '@/context/TransContext'
import { formatDate } from '@/utils/Fechas'
import { formatCurrency } from '@/utils/VerPrecio'
import React, { useEffect } from 'react'

const MovementsPage = () => {
    const { getMoves, moves } = useTransaction()

    useEffect(() => {
        getMoves()
    }, [])

    return (
        <div>
            <h2> Movimientos </h2>
            <section className='w-[90%] mx-auto flex flex-col gap-y-2 h-[500px] overflow-hidden overflow-y-scroll py-4 mt-8'>
                {moves.map((movimiento, i) => (
                    <article key={i} className='flex flex-row bg-slate-800  p-3 rounded-md justify-between items-center'>
                        <div className='flex flex-row items-center gap-x-2'>
                            <div className={`h-3 w-3 ${movimiento.type === "deposit" || "receive" ?  "bg-lime-500" : "bg-red-500" } rounded-full`} />
                            <h6> {movimiento?.details}</h6>
                        </div>
                        <div className='flex flex-col'>
                        <h6> {formatDate(movimiento?.date)}</h6>
                        <h6> $ { formatCurrency (movimiento?.amount) }</h6>
                        </div>
                       
                    </article>
                ))}
            </section>


        </div>
    )
}

export default MovementsPage