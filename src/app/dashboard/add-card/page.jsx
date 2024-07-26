'use client'

import { useAuth } from '@/context/AuthContext'
import { useCard } from '@/context/CardContext'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


const AddCardPage = () => {

    const { user, loading, isAuthenticated , errors: cardsErrors} = useAuth()
    const router = useRouter()
    console.log("El usuario es: ", user, "¿Está cargando? :", loading)
    const { register , handleSubmit } = useForm()
    const { card , createCard , errors , setError} = useCard()
    const [ cardComponent , setCardComponent ] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
      })
    console.log("El listado actual de Tarjetas :" , card)

    const onSubmit = handleSubmit((data)=>{
        console.log(data)
        createCard(data)
        router.push("/dashboard/add-card")
    })

    const onChange = (e) => {
        setCardComponent({
            ...cardComponent,
            [e.target.name] : e.target.value
        })
    }
 

    const handleInputFocus = (e) => {
        setCardComponent((prev) => ({ ...prev, focus: e.target.name }));
      }

      console.log(errors)

      useEffect(()=> {
        if(errors.length > 0 ){
           const timer = setTimeout( () => {
            setError([])
           },3000)
           return () => clearTimeout(timer)
        }
    },[errors])


    return (
        <section className=''>

        {errors.map((error, i) => (
            <div key={i} className='w-full absolute top-0 bg-red-700 text-center '> {error} </div>
        ))}

        <div className='mt-24'>
        <Cards 
        number={cardComponent.serial} 
        name={cardComponent.proietario}  
        expiry={ cardComponent.vto == undefined ?  "" : cardComponent.vto} 
        cvc={cardComponent.codeSegurity}
        focused={cardComponent.focus}/>
    
        </div>
            <h1> Agregar una tarjeta nueva </h1>
            <form onSubmit={onSubmit}
                className='flex flex-col gap-y-2 text-black'>


                <input className='bg-blue-100 p-2' 
                       name="proietario"
                       type='text' 
                       placeholder='Ingresar nombre de la tarjeta'
                       autoFocus
                       {...register("proietario")}
                       onChange={onChange}
                       onFocus={handleInputFocus}
                      
                />


                <input className='bg-blue-100 p-2' 
                       name="name"
                       type='text' 
                       placeholder='Ingresar Descripcion de la tarjeta '
                       autoFocus
                       {...register("name")}
                       onChange={onChange}
                       onFocus={handleInputFocus}
                     
                />


                <input className='bg-blue-100 p-2' 
                       maxlength="16"
                       name="serial" 
                       type='text' 
                       placeholder='Ingresa el numero de tarjeta'
                       {...register("serial")}
                       onChange={onChange}
                       onFocus={handleInputFocus}
                    
                />

                <input className='bg-blue-100 p-2' 
                name="codeSegurity" 
                maxlength="3"
                type='text' 
                placeholder='Codigo de seguridad'  
                {...register("codeSegurity")}
                onChange={onChange}
                onFocus={handleInputFocus}
             
                />

                <input className='bg-blue-100 p-2' 
                name="vto"
                maxlength="4"
                type='text' 
                placeholder='Vencimiento'
                {...register("vto")}
                onChange={onChange}
                onFocus={handleInputFocus}
 
                />



                <button className='bg-red-500 text-white p-2' type='submit'> Agregar </button>

            </form>

        </section>
    )
}

export default AddCardPage