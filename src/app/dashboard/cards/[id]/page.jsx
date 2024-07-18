'use client'

import { useAuth } from '@/context/AuthContext'
import { useCard } from '@/context/CardContext'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter , useParams} from 'next/navigation'


const EditCardPage = () => {

    const { user, loading, isAuthenticated } = useAuth()
    const router = useRouter()
    console.log("El usuario es: ", user, "¿Está cargando? :", loading)
    const { register , handleSubmit, setValue} = useForm()
    const { card , createCard , getCard , updateCard } = useCard()
    console.log("El listado actual de Tarjetas :" , card)
    const params = useParams()


    useEffect( () => {
      async function loadCard () {
        console.log("Los parametros recibidos : " , params)
        if(params.id){
          const card = await getCard(params.id)
          setValue("name" , card.name)
          setValue("serial" , card.serial)
          setValue("codeSegurity" , card.codeSegurity)
          setValue("vto" , card.vto)
      }}
      loadCard()
    } , [])

    const onSubmit = handleSubmit((data)=>{
       if(params.id){
        updateCard(params.id , data)
       }
        router.push("/dashboard")
    })

    return (
        <>
            <h1> Edita los datos de la Tarjeta ingresada </h1>
            <form onSubmit={onSubmit}
                className='flex flex-col gap-y-2 text-black'>

                <input className='bg-blue-100 p-2' 
                       name="name"
                       type='text' 
                       placeholder='Ingresar identificador de tarjeta'
                       autoFocus
                       {...register("name")}
                       
                />


                <input className='bg-blue-100 p-2' 
                       name="serial" 
                       type='text' 
                       placeholder='Ingresa el numero de tarjeta'
                       {...register("serial")}
                />

                <input className='bg-blue-100 p-2' 
                name="codeSegurity" 
                type='text' 
                placeholder='Codigo de seguridad'  
                {...register("codeSegurity")}
                />

                <input className='bg-blue-100 p-2' 
                name="vto"
                type='text' 
                placeholder='Vencimiento'
                {...register("vto")}
                />



                <button className='bg-red-500 text-white p-2' type='submit'> Confirmar </button>

            </form>

        </>
    )
}

export default EditCardPage