export const tacharNumero = (numero)  => {
        // Convertir el número a string para poder manipular los caracteres
        const numStr = numero.toString();
      
        // Reemplazar todos los dígitos menos los últimos 4 por asteriscos
        const ocultos = numStr.slice(0, -4).replace(/./g, '*');
        const visibles = numStr.slice(-4);
      
        return ocultos + visibles;
  }
  

  export function lastFourNumbers(number) {
      // Convertimos el número a una cadena
      const numberStr = number.toString();
      
      // Obtenemos los últimos 4 caracteres de la cadena
      const lastFourDigits = numberStr.slice(-4);
      
      // Convertimos la cadena de vuelta a un número y lo devolvemos
      return parseInt(lastFourDigits, 10);
    }