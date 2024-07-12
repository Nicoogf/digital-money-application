'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const LoguinPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signIn, errors: signInErrors , isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect( ()  =>{
    if(isAuthenticated) router.push("/dashboard")
  },[isAuthenticated])

  const OnSubmit = handleSubmit(async(data) => {
    const res = await signIn(data)
    console.log(res)
  })

  return (
    <main className='relative flex flex-col items-center justify-center h-screen '>
      {signInErrors.map((error, i) => (
        <div key={i} className='w-full absolute top-0 bg-red-700 text-center '> {error} </div>
      ))}

      <h1 className='text-lg font-semibold text-center'> Iniciar sesion </h1>
      <form onSubmit={OnSubmit}
        className='flex flex-col gap-y-2 text-black'>

        <input className='bg-blue-100 p-2' name="email" type='email' placeholder='Email'
          {...register("email", { required: true })} />

        {errors.email && <div className='text-white bg-red-500'>  El Email es requerido </div>}

        <input className='bg-blue-100 p-2' name="password" type='password' placeholder='Contraseña'
          {...register("password", { required: true })} />

        {errors.password && <div className='text-white bg-red-500'>  La contraseña es requerida </div>}


        <button className='bg-red-500 text-white p-2' type='submit'> Ingresar </button>

      </form>

      <p> ¿No tienes una cuenta ? 
        <Link href="/register"> Ingresa aca </Link>
      </p>
    </main>
  )
}

export default LoguinPage