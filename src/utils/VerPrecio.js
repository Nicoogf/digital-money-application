export function formatCurrency(amount) {
    // Convierte el número en un string con formato de moneda
    return amount?.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }