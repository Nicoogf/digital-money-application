'use client'
import { useAuth } from '@/context/AuthContext'
import { registerRequest } from '@/peticiones/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'



const RegisterPage = () => {
  const { register , handleSubmit , formState:{errors} } = useForm()
  const { signUp , user , isAuthenticated , errors: RegisterErrors  } = useAuth()
  const router = useRouter()

  useEffect( ()  =>{
    if(isAuthenticated) router.push("/dashboard")
  },[isAuthenticated])

  const OnSubmit =  handleSubmit(async(values) => {    
    const registeredUser = await signUp(values)
    console.log(isAuthenticated)
  })
   
  
  return (
    <main className='relative flex flex-col items-center justify-center h-screen '>
      { RegisterErrors.map( (error , i ) =>(
        <div key={i} className='w-full absolute top-0 bg-red-700 text-center '> {error} </div>
      ))}
       
       <h1 className='text-lg font-semibold text-center'> Regitro de Usuario </h1>
      
      <form onSubmit={OnSubmit}
        className='flex flex-col gap-y-2 text-black'>
        <input className='bg-blue-100 p-2 ' name="name" type='text' placeholder='Nombre'
          {...register("name", { required: true })}
        />

        {errors.name && <div className='text-white bg-red-500'> El nombre es requerido </div>}

        <input className='bg-blue-100 p-2' name="lastName" type='text' placeholder='Apellido'
          {...register("lastName", { required: true })} />

        {errors.lastName && <div className='text-white bg-red-500'>  El Apellido es requerido </div>}


        <input className='bg-blue-100 p-2' name="dni" type='number' placeholder='Documento'
          {...register("dni", { required: true })}
        />

        {errors.dni && <div className='text-white bg-red-500'>  El Dni es requerido </div>}

        <input className='bg-blue-100 p-2' name="email" type='email' placeholder='Email'
          {...register("email", { required: true })} />

        {errors.email && <div className='text-white bg-red-500'>  El Email es requerido </div>}

        <select name="rol" placeholder='Rol' className='text-black bg-blue-100 p-2'
          {...register("rol", { required: true })}>
          <option>Usuario</option>
          <option>Empresa</option>
        </select>

        {errors.rol && <div className='text-white bg-red-500'>  El Rol es requerido </div>}


        <input className='bg-blue-100 p-2' name="password" type='password' placeholder='Contraseña'
          {...register("password", { required: true })} />

        {errors.password && <div className='text-white bg-red-500'>  La contraseña es requerida </div>}


        <input className='bg-blue-100 p-2' name="confirmPassword" type='password' placeholder='Confirmar Contraseña'
          {...register("confirmPassword", { required: true })} />

          {errors.confirmPassword && <div className='text-white bg-red-500'> La Confirmacion es requerida </div>}

          <button className='bg-red-500 text-white p-2' type='submit'> Registrar </button>

      </form>
    </main>
  )
}

export default RegisterPage