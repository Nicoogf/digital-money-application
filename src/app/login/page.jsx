// 'use client'
// import { useAuth } from '@/context/AuthContext'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import React, { useEffect } from 'react'
// import { useForm } from 'react-hook-form'

// const LoguinPage = () => {

//   const { register, handleSubmit, formState: { errors } } = useForm()
//   const { signIn, errors: signInErrors , isAuthenticated } = useAuth()
//   const router = useRouter()

//   useEffect( ()  =>{
//     if(isAuthenticated) router.push("/dashboard")
//   },[isAuthenticated])

//   const OnSubmit = handleSubmit(async(data) => {
//     const res = await signIn(data)
//     console.log(res)
//   })

//   return (
//     <>

//       {signInErrors.map((error, i) => (
//         <div key={i} className='w-full absolute top-0 bg-red-700 text-center '> {error} </div>
//       ))}

//       {errors.email && <div className='text-white bg-red-500 absolute top-0 w-full text-center '>  
//         El Email es requerido 
//       </div>} 
//       {errors.password && <div className='text-white bg-red-500 absolute top-6 w-full text-center '>  La contraseña es requerida </div>}

//       <div className=' flex flex-col w-[95%] mx-auto max-w-[400px]'>
//       <h1 className='text-lg font-semibold text-center mb-2 '> Iniciar sesion </h1>
//       <form onSubmit={OnSubmit}
//         className='flex flex-col gap-y-2 text-lime-400 w-full'>

//         <input className='bg-gray-700 p-2 rounded-md outline-none' name="email" type='email' placeholder='Email'
//           {...register("email", { required: true })} />

//         {/* {errors.email && <div className='text-white bg-red-500'>  El Email es requerido </div>} */}

//         <input className='bg-gray-700 p-2 rounded-md outline-none mb-1' name="password" type='password' placeholder='Contraseña'
//           {...register("password", { required: true })} />

//         {/* {errors.password && <div className='text-white bg-red-500'>  La contraseña es requerida </div>} */}


//         <button className='bg-lime-600 text-white p-2 rounded-md mb-2' type='submit'> Ingresar </button>

//       </form>

//       <p className='text-sm'> ¿No tienes una cuenta ? 
//         <Link href="/register" className='text-xs text-blue-400'> Ingresa aca </Link>
//       </p>
//       </div>

//     </>
//   )
// }

// export default LoguinPage


'use client'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signIn, errors: signInErrors, isAuthenticated } = useAuth()
  const router = useRouter()
  const [mailValidate, setMailValidate] = useState(false)

    const OnSubmit = handleSubmit(async(data) => {
    const res = await signIn(data)
    console.log(res)
    router.push("/dashboard")
  })

  useEffect(() => {
    if (isAuthenticated) router.push("/dashboard")
  }, [isAuthenticated])

  const setPassword = (e) => {
    e.preventDefault()
    console.log(mailValidate)
    setMailValidate(!mailValidate)
  }

  return (
    <>

      {signInErrors.map((error, i) => (
        <div key={i} className='w-full absolute top-0 bg-red-700 text-center '> {error} </div>
      ))}

      {errors.email && <div className='text-white bg-red-500 absolute top-0 w-full text-center '>
        El Email es requerido
      </div>}
      {errors.password && <div className='text-white bg-red-500 absolute top-6 w-full text-center '>  La contraseña es requerida </div>}


      <form onSubmit={OnSubmit} 
      className='border border-gray-700 h-[250px] rounded-md flex flex-col gap-4 bg-slate-800  overflow-hidden relative w-[95%] max-w-[400px] mx-auto set-scrollbar'>


        <div className={`flex flex-col pt-8 transition-all duration-500 mt-5
        ${mailValidate ? "-translate-y-56 opacity-0"
            : "translate-y-0 opacity-100 flex"
          }`}>

          <label className='py-2 w-[60%] mx-auto font-semibold text-center'> Ingresar Email </label>

          <input type="email" className='py-2 w-[60%] mx-auto text-lime-500 text-center bg-gray-700 rounded-lg' 
          {...register("email", { required: true })} />

          <button className='mt-4 bg-lime-400 w-[60%] p-2 rounded-md text-lime-950 mx-auto font-semibold' onClick={setPassword}> Siguiente </button>
        </div>

        <div className={`flex flex-col mt-12 py-2 transition-all duration-500 
        ${mailValidate ? "-translate-y-56 opacity-100"
            : "translate-y-0 opacity-0 "
          }`}>
          <label className='py-2 w-[60%] mx-auto font-semibold text-center'>Ingresar Contaseña </label>

          <input className='py-2 w-[60%] mx-auto text-lime-500 text-center bg-gray-700 rounded-lg' type='password' 
           {...register("password", { required: true })}/>

          <div className='flex flex-row gap-x-2 w-[95%] mx-auto  justify-center mt-2'>
            <button className='text-sm my-4 bg-gray-800 border border-lime-500 p-2 rounded-md text-lime-500 font-semibold' onClick={setPassword}> Modificar Email </button>
            <button className='my-4 bg-lime-400 p-2 rounded-md text-lime-950 font-semibold' type='submit'> Siguiente </button>
          </div>

        </div>

        <div className='absolute bottom-1 right-1 flex flex-row w-[97%] mx-auto justify-between '>
        <p className=' text-white text-xs'>¿ No tienes cuenta ? 
          <Link href="/register" className='text-blue-400'> Ingresa aca </Link> 
        </p>
        <Link className='text-blue-400 text-xs' href="/forget-password"> ¿Olvidaste tu Contraseña ? </Link>
        </div>
        

      </form>

    </>
  )
}

export default LoginPage