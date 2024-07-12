'use client'
import { useAuth } from '@/context/AuthContext'
import React from 'react'
import { useForm } from 'react-hook-form'


const AddCardPage = () => {
    const { register , handleSubmit } = useForm()
    const onSubmit = handleSubmit((data)=>{
        console.log(data)
    })
    return (
        <main className='relative flex flex-col items-center justify-center h-screen '>
            <h1> Agregar una tarjeta nueva </h1>
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



                <button className='bg-red-500 text-white p-2' type='submit'> Agregar </button>

            </form>

        </main>
    )
}

export default AddCardPage