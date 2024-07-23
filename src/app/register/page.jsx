// 'use client'
// import { useAuth } from '@/context/AuthContext'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import React, { useEffect } from 'react'
// import { useForm } from 'react-hook-form'

// const RegisterPage = () => {
//   const { register , handleSubmit , formState:{errors} } = useForm()
//   const { signUp , user , isAuthenticated , errors: RegisterErrors  } = useAuth()
//   const router = useRouter()

//   useEffect( ()  =>{
//     if(isAuthenticated) router.push("/dashboard")
//   },[isAuthenticated])

//   const OnSubmit =  handleSubmit(async(values) => {    
//     const registeredUser = await signUp(values)
//     console.log(isAuthenticated)
//   })

//   return (
//     <>

//       { RegisterErrors.map( (error , i ) =>(
//         <div key={i} className='w-full absolute top-0 bg-red-700 text-center '> {error} </div>
//       ))}

//        <h1 className='text-lg font-semibold text-center'> Regitro de Usuario </h1>

//       <form onSubmit={OnSubmit}
//         className='flex flex-col gap-y-2 text-gray-400 '>
//         <input className='bg-gray-700 p-2 rounded-md outline-none' name="name" type='text' placeholder='Nombre'
//           {...register("name", { required: true })}
//         />

//         {errors.name && <div className='text-white bg-red-500'> El nombre es requerido </div>}

//         <input className='bg-gray-700 p-2 rounded-md outline-none' name="lastname" type='text' placeholder='Apellido'
//           {...register("lastname", { required: true })} />

//         {errors.lastName && <div className='text-white bg-red-500'>  El Apellido es requerido </div>}


//         <input className='bg-gray-700 p-2 rounded-md outline-none' name="dni" type='number' placeholder='Documento'
//           {...register("dni", { required: true })}
//         />

//         {errors.dni && <div className='text-white bg-red-500'>  El Dni es requerido </div>}

//         <input className='bg-gray-700 p-2 rounded-md outline-none' name="email" type='email' placeholder='Email'
//           {...register("email", { required: true })} />

//         {errors.email && <div className='text-white bg-red-500'>  El Email es requerido </div>}

//         <select name="rol" placeholder='Rol' className='bg-gray-700 p-2 rounded-md outline-none border border-lime-500 text-lime-500 font-semibold'
//           {...register("rol", { required: true })}>
//           <option className='bg-lime-500 text-lime-950 font-semibold'>Usuario</option>
//           <option className='bg-lime-500 text-lime-950 font-semibold' >Empresa</option>
//         </select>

//         {errors.rol && <div className='text-white bg-red-500'>  El Rol es requerido </div>}


//         <input className='bg-gray-700 p-2 rounded-md outline-none' name="phone" type='number' placeholder='Telefono'
//           {...register("phone", { required: true })}
//         />

//         {errors.dni && <div className='text-white bg-red-500'>  El Dni es requerido </div>}


//         <input className='bg-gray-700 p-2 rounded-md outline-none' name="password" type='password' placeholder='Contraseña'
//           {...register("password", { required: true })} />

//         {errors.password && <div className='text-white bg-red-500'>  La contraseña es requerida </div>}


//         <input className='bg-gray-700 p-2 rounded-md outline-none' name="confirmPassword" type='password' placeholder='Confirmar Contraseña'
//           {...register("confirmPassword", { required: true })} />

//           {errors.confirmPassword && <div className='text-white bg-red-500'> La Confirmacion es requerida </div>}

//           <button className='bg-lime-600 text-white p-2 rounded-md' type='submit'> Registrar </button>
//           <p className='text-white'> ¿Ya tienes una cuenta? 
//          <Link href="/login"> Inicia Sesion </Link>
//       </p>

//       </form>

//     </>
//   )
// }

// export default RegisterPage

'use client'
import { useAuth } from '@/context/AuthContext'
import { set } from 'mongoose'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } , watch} = useForm();
  const { signUp, user, isAuthenticated, errors: RegisterErrors } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState('Usuario')

  // useEffect(() => {
  //   if (isAuthenticated) router.push("/dashboard");
  // }, [isAuthenticated]);

  const OnSubmit = handleSubmit(async (values) => {
    const registeredUser = await signUp(values);
    console.log("El registered User es : " ,registeredUser )
    if(registeredUser){
      router.push("/login")
    }  
    console.log(isAuthenticated);
  });

  console.log(role)
  const onChangeRol = (e) => {
    setRole(e.target.value)
  }

  useEffect(() => {
    console.log(role)
  }, [role, setRole])


 

  return (
    <>

     {RegisterErrors.map((error, i) => (
        <div key={i} className='w-full absolute top-0 bg-red-700 text-center '> {error} </div>
      ))}


      <h1 className='text-lg font-semibold text-center'> Registro de Usuario </h1>
      <h2 className=''> Configuracion Actual : {role} </h2>

      <form onSubmit={OnSubmit} className='flex flex-col gap-y-2 text-gray-400 '>

        <select name="rol" placeholder='Rol' className='bg-gray-700 p-2 rounded-md outline-none border border-lime-500 text-lime-500 font-semibold'
          {...register("rol", { required: true })} onChange={onChangeRol}>
          <option className='bg-lime-500 text-lime-950 font-semibold'>Usuario</option>
          <option className='bg-lime-500 text-lime-950 font-semibold' >Empresa</option>
        </select>

        <div className='border-b border-lime-300 w-[80%] mx-auto my-4' />

        {role === "Usuario" && (
          <>

            <input className='bg-gray-700 p-2 rounded-md outline-none' name="name" type='text' placeholder='Nombre'
              {...register("name", { required: true })}
            />
            {errors.name && <div className='text-white bg-red-500'> El nombre es requerido </div>}

            <input className='bg-gray-700 p-2 rounded-md outline-none' name="lastname" type='text' placeholder='Apellido'
              {...register("lastname", { required: true })} />
            {errors.lastname && <div className='text-white bg-red-500'>  El Apellido es requerido </div>}


            <input className='bg-gray-700 p-2 rounded-md outline-none' name="dni" type='number' placeholder='Documento'
              {...register("dni", { required: true })}
            />

            {errors.dni && <div className='text-white bg-red-500'>  El Dni es requerido </div>}

            <input className='bg-gray-700 p-2 rounded-md outline-none' name="email" type='email' placeholder='Email'
              {...register("email", { required: true })} />

            {errors.email && <div className='text-white bg-red-500'>  El Email es requerido </div>}

            <input className='bg-gray-700 p-2 rounded-md outline-none' name="phone" type='number' placeholder='Telefono'
              {...register("phone", { required: true })}
            />

            {errors.dni && <div className='text-white bg-red-500'>  El Dni es requerido </div>}


            <input className='bg-gray-700 p-2 rounded-md outline-none' name="password" type='password' placeholder='Contraseña'
              {...register("password", { required: true })} />

            {errors.password && <div className='text-white bg-red-500'>  La contraseña es requerida </div>}


            <input className='bg-gray-700 p-2 rounded-md outline-none' name="confirmPassword" type='password' placeholder='Confirmar Contraseña'
              {...register("confirmPassword", { required: true })} />

            {errors.confirmPassword && <div className='text-white bg-red-500'> La Confirmacion es requerida </div>}
          </>
        )}

        {role === "Empresa" && (
          <>
            <input className='bg-gray-700 p-2 rounded-md outline-none' name="companyName" type='text' placeholder='Nombre de la Empresa'
              {...register("companyName", { required: true })}
            />

            {errors.companyName && <div className='text-white bg-red-500'> El nombre de la empresa es requerido </div>}


            <select name="businessField" placeholder='Area' className='bg-gray-700 p-2 rounded-md outline-none border border-lime-500 text-lime-500 font-semibold'
              {...register("businessField", { required: true })} >
              <option className='bg-lime-500 text-lime-950 font-semibold'>Internet </option>
              <option className='bg-lime-500 text-lime-950 font-semibold' >Telefonia </option>
              <option className='bg-lime-500 text-lime-950 font-semibold' >Televicion </option>
              <option className='bg-lime-500 text-lime-950 font-semibold' >Streaming </option>
              <option className='bg-lime-500 text-lime-950 font-semibold' >Servicios </option>
            </select>

            {errors.businessField && <div className='text-white bg-red-500'>  El area es requerido </div>}


            <input className='bg-gray-700 p-2 rounded-md outline-none' name="cuit" type='number' placeholder='CUIT'
              {...register("cuit", { required: true })}
            />

            {errors.cuit && <div className='text-white bg-red-500'>  El CUIT es requerido </div>}


            <input className='bg-gray-700 p-2 rounded-md outline-none' name="email" type='email' placeholder='Email'
              {...register("email", { required: true })} />

            {errors.email && <div className='text-white bg-red-500'>  El Email es requerido </div>}


            <input className='bg-gray-700 p-2 rounded-md outline-none' name="phone" type='number' placeholder='Telefono'
              {...register("phone", { required: true })}
            />

            {errors.phone && <div className='text-white bg-red-500'>  El phone es requerido </div>}


            <input className='bg-gray-700 p-2 rounded-md outline-none' name="password" type='password' placeholder='Contraseña'
              {...register("password", { required: true })} />

            {errors.password && <div className='text-white bg-red-500'>  La contraseña es requerida </div>}


            <input className='bg-gray-700 p-2 rounded-md outline-none' name="confirmPassword" type='password' placeholder='Confirmar Contraseña'
               {...register("confirmPassword", { 
                required: "La confirmación es requerida",
                validate: value => value === password || "Las contraseñas no coinciden"
              })} />

            {errors.confirmPassword && <div className='text-white bg-red-500'> La Confirmacion es requerida </div>}
          </>
        )}

        <button className='bg-lime-600 text-white p-2 rounded-md' type='submit'> 
          Registrar 
        </button>
                <p className='text-white'> ¿Ya tienes una cuenta?
          <Link href="/login"> Inicia Sesion </Link>
        </p>

      </form>
    </>
  );
}

export default RegisterPage;