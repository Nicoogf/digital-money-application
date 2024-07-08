export function GenerarCBU() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
}

export function GenerarAlias(palabras) {
        if (palabras.length < 3) {
          throw new Error("El array debe contener al menos 3 palabras");
        }
      
        // Función para obtener un índice aleatorio del array
        function obtenerIndiceAleatorio(arr) {
          return Math.floor(Math.random() * arr.length);
        }
      
        // Crear un set para almacenar los índices únicos
        const indicesSeleccionados = new Set();
      
        // Seleccionar 3 índices únicos aleatorios
        while (indicesSeleccionados.size < 3) {
          indicesSeleccionados.add(obtenerIndiceAleatorio(palabras));
        }
      
        // Convertir el set a array y mapear las palabras seleccionadas
        const aliasArray = Array.from(indicesSeleccionados).map(indice => palabras[indice]);
      
        // Unir las palabras con un punto
        return aliasArray.join('.');
      }
 