'use client'
import { registerRequest } from '@/peticiones/auth'
import React from 'react'
import { useForm } from 'react-hook-form'

const RegisterPage = () => {
  const { register , handleSubmit } = useForm()
  return (
    <main>

      <form onSubmit={handleSubmit(async(values) => {
        console.log(values)
        const res = await registerRequest(values)
        console.log(res)
      })}
        className='flex flex-col gap-y-2 text-black'>
        <input className='bg-blue-100 p-2 ' name="name" type='text' placeholder='Nombre'
          {...register("name", { required: true })}
        />

        <input className='bg-blue-100 p-2' name="lastName" type='text' placeholder='Apellido'
          {...register("lastName", { required: true })} />


        <input className='bg-blue-100 p-2' name="dni" type='number' placeholder='Documento'
          {...register("dni", { required: true })}
        />

        <input className='bg-blue-100 p-2' name="email" type='email' placeholder='Email'
          {...register("email", { required: true })} />


        <select name="rol" placeholder='Rol' className='text-black bg-blue-100 p-2'
          {...register("rol", { required: true })}>
          <option>Usuario</option>
          <option>Empresa</option>
        </select>


        <input className='bg-blue-100 p-2' name="password" type='password' placeholder='Contraseña'
          {...register("password", { required: true })} />


        <input className='bg-blue-100 p-2' name="confirmPassword" type='password' placeholder='Confirmar Contraseña'
          {...register("confirmPassword", { required: true })} />

          <button className='bg-red-500 text-white p-2' type='submit'> Registrar </button>

      </form>
    </main>
  )
}

export default RegisterPage