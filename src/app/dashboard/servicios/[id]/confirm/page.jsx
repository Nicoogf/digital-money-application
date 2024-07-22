'use client'
import { useTransaction } from '@/context/TransContext'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { generateRandomPrice } from '@/utils/randomcbu'
import { useCard } from '@/context/CardContext'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const ConfirmPago = () => {
    const { business, getBusiness, payServices } = useTransaction()
    const parametros = useParams()
    const { cards, getCards } = useCard()
    const { user } = useAuth()
    const { register , handleSubmit} = useForm()
    console.log(parametros.id)
    const router = useRouter()
    useEffect(() => {
        getBusiness()
        getCards()
    }, [])



    const empresaDetail = business.find(empresa => empresa._id === parametros.id);
    console.log(empresaDetail)
    console.log(cards)
    console.log(user)
   
    const precioRandom =generateRandomPrice()
   
    const onSubmit = handleSubmit(async (data) => {

        const infoDelPago = { ...data , 
            amount : precioRandom ,
            empresa_id : empresaDetail._id ,
            username: user.name ,
            userlastname: user.lastname ,
            user_id : user.id}
        
        console.log({ ...data ,
             amount : precioRandom , 
             empresa_id : empresaDetail._id ,
              email:user.email , 
              user: user.name})
        payServices(infoDelPago)
        router.push("/dashboard")
    })
    
    
    return (
        <section>
            <section>
                <h4>Confirmacion de Pago</h4>
                <h5> {empresaDetail?.companyName} </h5>
                <div className='flex flex-row'>
                    <h4> Total a Pagar </h4>
                    <h5> $ {precioRandom} </h5>
                </div>
            </section>
            <form onSubmit={onSubmit} className='bg-gray-950 flex flex-col w-[80%] max-w-[720px] mx-auto p-4 gap-y-2 text-black'>



                <div class="flex flex-col space-y-2">
                    <label for="card" class="text-lime-500 font-semibold">Tarjeta</label>
                    <div class="space-y-1">
                        {cards.map((card, i) => (
                            <label key={i} class="flex items-center justify-between">
                                <span class="ml-2 text-gray-700">{card?.name}</span>
                                <span class="ml-2 text-gray-700">{card?.mount}</span>
                                <input type="radio" id={`rol-${card?.name}`} name="rol" value={card._id} class="hidden-input" {...register("card", { required: true })} />
                            </label>
                        ))}
                    </div>
                </div>


                <button className='bg-lime-500 text-lime-950 p-2'> Enviar </button>
            </form>
        </section>
    )
}

export default ConfirmPago