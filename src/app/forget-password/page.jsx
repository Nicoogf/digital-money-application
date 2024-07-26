'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'

const ForgetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {forgetPassword , errors: forgetErrors} = useAuth()
    const router = useRouter()

    const OnSubmit = handleSubmit(async(data) => {      
       const res = await forgetPassword(data)
       router.push("/login")
      })


  return (
    <> 

    {forgetErrors.map((error, i) => (
        <div key={i} className='w-full absolute top-0 bg-red-700 text-center '> {error} </div>
      ))}

    <form onSubmit={OnSubmit} 
      className='border border-gray-700 h-[250px] rounded-md flex flex-col gap-2 bg-slate-800 relative mx-auto w-[95%] max-w-[400px] justify-center items-center'>


     

          <label className='py-1 w-[60%] mx-auto font-semibold text-center'> Ingresar Email </label>

          <input type="email" className='py-2 w-[60%] mx-auto text-lime-500 text-center bg-gray-700 rounded-lg' 
          {...register("email", { required: true })} />

          <button className='mt-4 bg-lime-400 w-[60%] p-2 rounded-md text-lime-950 mx-auto font-semibold'> Siguiente </button>
     
    

      </form>
      </>

  )
}

export default ForgetPassword