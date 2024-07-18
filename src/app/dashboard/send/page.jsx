'use client'
import { useAuth } from '@/context/AuthContext'
import { useTransaction } from '@/context/TransContext'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'


const SendPage = () => {
const { user, loading, isAuthenticated } = useAuth()
const { handleSubmit , register} = useForm()
const { sendMoney } = useTransaction()
const router = useRouter()

const onSubmit = handleSubmit((data) => {
  console.log({...data, email : user?.email})
  sendMoney({...data, email : user?.email})
  router.push("/dashboard")
})


useEffect(() => {
  if (!loading && !isAuthenticated) {
      router.push("/login")
  }
}, [loading, isAuthenticated, router])


  return (
    <section>
      <form onSubmit={onSubmit} className='bg-gray-700 flex flex-col w-[80%] max-w-[720px] mx-auto p-2 gap-y-2 text-black'>
        <input name="alias" type="text" placeholder='Ingresar destinatario' className='p-2'
        {...register("alias" , {required :true })}/>

        <input name="amount" type="number" className='p-2' placeholder="Ingresar Monto"
        {...register("amount" , {required :true })} />

        <button className='bg-lime-500 text-lime-950 p-2'> Enviar </button>
      </form>
    </section>
  )
}

export default SendPage