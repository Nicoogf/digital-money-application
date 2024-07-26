export function obtenerFechaActual() {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript   
    const año = fecha.getFullYear();
  
    // Aseguramos que el día y el mes tengan dos dígitos
    const diaConCeros = dia.toString().padStart(2, '0');
    const mesConCeros = mes.toString().padStart(2, '0');
  
    return `${diaConCeros}/${mesConCeros}/${año}`;
  }
  

  export function transformarFecha(fechaISO) {
    // Creamos un objeto Date a partir de la cadena ISO
    const fecha = new Date(fechaISO);
  
    // Extraemos los componentes de la fecha
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();   
  
  
    // Devolvemos la fecha en el formato deseado
    return `${dia}/${mes}/${año}`;
  }