export const  tacharNumero = (numero)  => {
        // Convertir el número a string para poder manipular los caracteres
        const numStr = numero.toString();
      
        // Reemplazar todos los dígitos menos los últimos 4 por asteriscos
        const ocultos = numStr.slice(0, -4).replace(/./g, '*');
        const visibles = numStr.slice(-4);
      
        return ocultos + visibles;
  }
  
