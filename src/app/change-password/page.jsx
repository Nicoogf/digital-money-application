'use client'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { IoMdEye } from "react-icons/io";
import { BsFillEyeSlashFill } from "react-icons/bs";

const RecoveryPage = () => {
  const searchParams = useSearchParams()
  const { handleSubmit, register } = useForm()
  const { changePass } = useAuth()
  const router = useRouter()
  const [view, setView] = useState(false)

  const token = searchParams.get("token")
  console.log(token)

  const OnSubmit = handleSubmit(async (data) => {
    const res = await changePass({ ...data, token })
    router.push("/login")
  })

  const handleView = () => {
    setView(!view)
  }
  console.log(view)

  return (
    <>
      <form className=' flex flex-col items-center justify-center gap-4 bg-slate-800 h-[250px] max-w-[400px]  p-3 w-[95%] mx-auto rounded-lg gap-y-2 ' onSubmit={OnSubmit}>
        <label className='text-white text-sm w-[60%] mx-auto'> Ingresar contraseña nueva </label>
        <div className='flex flex-row items-center '>
          <input type={view ? "text" : "password"} name="newPassword" {...register("newPassword")} className='py-2 w-[90%] text-lime-500 text-center bg-gray-700 rounded-lg  text-sm' />
          { view ? (
            <BsFillEyeSlashFill className='ml-2 text-2xl text-greenlime cursor-pointer' onClick={handleView} /> 
          ) : (
            <IoMdEye className='ml-2 text-2xl text-greenlime cursor-pointer' onClick={handleView} />
          ) }
        </div>

        <label className='text-white text-sm w-[60%] mx-auto'> Confirmar contraseña nueva</label>
        <div className='flex flex-row  items-center'>
          <input type={view ? "text" : "password"} name="confirmPassword" {...register("confirmPassword")} className='py-2 w-[90%] text-lime-500 text-center bg-gray-700 rounded-lg text-sm' />

          { view ? (
            <BsFillEyeSlashFill className='ml-2 text-2xl text-greenlime cursor-pointer' onClick={handleView} /> 
          ) : (
            <IoMdEye className='ml-2 text-2xl text-greenlime cursor-pointer' onClick={handleView} />
          ) }
        </div>
        <button className='bg-greenlime text-lime-950 p-2 rounded-md mt-2 font-semibold w-[60%] mx-auto text-sm'> Cambiar Contraseña </button>
      </form>
    </>
  )
}

export default RecoveryPage