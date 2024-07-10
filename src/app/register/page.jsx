import React from 'react'

const RegisterPage = () => {
  return (
    <main>

      <form>
        <input className='bg-blue-100' name="name" type='text' placeholder='Nombre' />
        <input className='bg-blue-100' name="lastName" type='text' placeholder='Apellido' />
        <input className='bg-blue-100' name="dni" type='number' placeholder='Documento' />
        <input className='bg-blue-100' name="email" type='email' placeholder='Email' />

        <select name="rol" placeholder='Rol' className='text-black bg-blue-100'>          
          <option>Usuario</option>
          <option>Empresa</option>    
        </select>

        <input className='bg-blue-100' name="password" type='password' placeholder='Contraseña' />
        <input className='bg-blue-100' name="confirmPassword" type='password' placeholder='Confirmar Contraseña' />
      </form>
    </main>
  )
}

export default RegisterPage