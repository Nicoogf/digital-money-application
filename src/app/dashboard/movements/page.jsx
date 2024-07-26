//Se debe poder filtrar por período las transacciones: hoy, ayer, última semana, últimos 15 días, último mes, últimos 3 meses.
//Se debe poder filtrar por operaciones: ingresos o egresos.
//Debe estar paginado, cada página 10 transacciones.
//Debe mostrarse por default la fecha (de la más nueva a la más antigua).
//Debe haber un buscador que busque por palabras claves en el título de la transacción realizada.
//Se debe poder borrar los filtros mediante un botón.
//Se debe poder ver el detalle de cada transacción.
//Se debe poder ver el resumen de la transacción realizada al hacer clic en una transacción determinada.
//Me gustaría filtrar mis actividades por monto aproximado:
// 'use client'
// import { useTransaction } from '@/context/TransContext'
// import { obtenerFechaActual, transformarFecha } from '@/utils/fecha'
// import { formatDate } from '@/utils/Fechas'
// import { formatCurrency } from '@/utils/VerPrecio'
// import React, { useEffect, useState } from 'react'
// import { BiTransfer } from "react-icons/bi";

// const MovementsPage = () => {
//     const { getMoves, moves } = useTransaction()


//     useEffect(() => {
//         getMoves()
//     }, [])


  
//     return (
//         <div>
//             <h2 className='text-center text-2xl font-semibold my-3'> Movimientos </h2>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 <input placeholder='Buscar movimiento'/>
//             </section>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 <h6 className='bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer'> Hoy </h6>
//                 <h6 className='bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer'> ayer </h6>
//                 <h6 className='bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer'> última semana </h6>
//                 <h6 className='bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer'> últimos 15 días </h6>
//                 <h6 className='bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer'> último mes </h6>
//                 <h6 className='bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer'> últimos 3 meses </h6>
//             </section>

//             <section className='flex flex-row gap-x-2 w-[90%] mx-auto justify-center'> 

//                 <select name="favoriteOnly" id="favoriteOnly" className='text-black'>
//                     <option>Elije una opcion</option>
//                     <option>Ingresos </option>
//                     <option>Egresos</option>
//                 </select>

//                 <select name="favoriteOnly" id="favoriteOnly" className='text-black'>
//                     <option>Elije una opcion</option>
//                     <option>Ingresos </option>
//                     <option>Egresos</option>
//                 </select>

//                 <div className='flex flex-row items-center text-greenlime cursor-pointer border border-lime-500 py-1 px-3'>
//                 <BiTransfer className='text-greenlime text-2xl rotate-90'/>
//                 <h3> Mas recientes </h3>
//                 </div>

//             </section>

//                 <div className='w-full flex flex-row justify-center'>
//                 <input type="range" className='w-[80%] mx-auto my-4'/>
//                 </div>


//             <section className='w-[90%] mx-auto flex flex-col gap-y-2 h-[600px] overflow-hidden overflow-y-scroll py-2 mt-4 relative pt-4'>
                
                
//                 {moves.map((movimiento, i) => (
//                     <article key={i} className='flex flex-row bg-slate-800  p-3 rounded-md justify-between items-center'>
//                         <div className='flex flex-row items-center gap-x-2'>
//                             <div className={`h-3 w-3 ${movimiento.type === "deposit" || "receive" ?  "bg-lime-500" : "bg-red-500" } rounded-full`} />
//                             <h6> {movimiento?.details}</h6>
//                         </div>
//                         <div className='flex flex-col'>
//                         <h6> {formatDate(movimiento?.date)}</h6>
//                         <h6> $ { formatCurrency (movimiento?.amount) }</h6>
//                         </div>
                       
//                     </article>
//                 ))}
//             </section>


//         </div>
//     )
// }

// export default MovementsPage


// 'use client'
// import { useTransaction } from '@/context/TransContext'
// import { formatDate } from '@/utils/Fechas'
// import { formatCurrency } from '@/utils/VerPrecio'
// import React, { useEffect, useState, useMemo } from 'react'
// import { BiTransfer } from "react-icons/bi";

// const MovementsPage = () => {
//     const { getMoves, moves } = useTransaction()
//     const [filterPeriod, setFilterPeriod] = useState('');
//     const [selectedButton, setSelectedButton] = useState(null);

//     useEffect(() => {
//         getMoves()
//     }, [])

//     const handleFilterPeriod = (period, index) => {
//         if (filterPeriod === period) {
//             setFilterPeriod('');
//             setSelectedButton(null);
//         } else {
//             setFilterPeriod(period);
//             setSelectedButton(index);
//         }
//     };

//     const filteredMovements = useMemo(() => {
//         return moves.filter(mov => {
//             const now = new Date();
//             const movDate = new Date(mov.date);
//             switch (filterPeriod) {
//                 case 'hoy':
//                     return movDate.toDateString() === now.toDateString();
//                 case 'ayer':
//                     const yesterday = new Date(now);
//                     yesterday.setDate(now.getDate() - 1);
//                     return movDate.toDateString() === yesterday.toDateString();
//                 case 'última semana':
//                     const lastWeek = new Date(now);
//                     lastWeek.setDate(now.getDate() - 7);
//                     return movDate >= lastWeek;
//                 case 'últimos 15 días':
//                     const last15Days = new Date(now);
//                     last15Days.setDate(now.getDate() - 15);
//                     return movDate >= last15Days;
//                 case 'último mes':
//                     const lastMonth = new Date(now);
//                     lastMonth.setMonth(now.getMonth() - 1);
//                     return movDate >= lastMonth;
//                 case 'últimos 3 meses':
//                     const last3Months = new Date(now);
//                     last3Months.setMonth(now.getMonth() - 3);
//                     return movDate >= last3Months;
//                 default:
//                     return true;
//             }
//         });
//     }, [moves, filterPeriod]);

//     return (
//         <div>
//             <h2 className='text-center text-2xl font-semibold my-3'> Movimientos </h2>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 <input placeholder='Buscar movimiento'/>
//             </section>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 {['hoy', 'ayer', 'última semana', 'últimos 15 días', 'último mes', 'últimos 3 meses'].map((period, index) => (
//                     <h6
//                         key={index}
//                         className={`bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer ${selectedButton === index ? 'bg-blue-700' : ''}`}
//                         onClick={() => handleFilterPeriod(period, index)}
//                     >
//                         {period.charAt(0).toUpperCase() + period.slice(1)}
//                     </h6>
//                 ))}
//             </section>

//             <section className='flex flex-row gap-x-2 w-[90%] mx-auto justify-center'> 
//                 <select name="favoriteOnly" id="favoriteOnly" className='text-black'>
//                     <option>Elije una opción</option>
//                     <option>Ingresos</option>
//                     <option>Egresos</option>
//                 </select>

//                 <select name="favoriteOnly" id="favoriteOnly" className='text-black'>
//                     <option>Elije una opción</option>
//                     <option>Ingresos</option>
//                     <option>Egresos</option>
//                 </select>

//                 <div className='flex flex-row items-center text-greenlime cursor-pointer border border-lime-500 py-1 px-3'>
//                     <BiTransfer className='text-greenlime text-2xl rotate-90'/>
//                     <h3> Más recientes </h3>
//                 </div>
//             </section>

//             <div className='w-full flex flex-row justify-center'>
//                 <input type="range" className='w-[80%] mx-auto my-4'/>
//             </div>

//             <section className='w-[90%] mx-auto flex flex-col gap-y-2 h-[600px] overflow-hidden overflow-y-scroll py-2 mt-4 relative pt-4'>
//                 {filteredMovements.map((movimiento, i) => (
//                     <article key={i} className='flex flex-row bg-slate-800 p-3 rounded-md justify-between items-center'>
//                         <div className='flex flex-row items-center gap-x-2'>
//                             <div className={`h-3 w-3 ${movimiento.type === "deposit" || "receive" ? "bg-lime-500" : "bg-red-500"} rounded-full`} />
//                             <h6> {movimiento?.details}</h6>
//                         </div>
//                         <div className='flex flex-col'>
//                             <h6> {formatDate(movimiento?.date)}</h6>
//                             <h6> $ {formatCurrency(movimiento?.amount)}</h6>
//                         </div>
//                     </article>
//                 ))}
//             </section>
//         </div>
//     )
// }

// export default MovementsPage


// 'use client'
// import { useTransaction } from '@/context/TransContext'
// import { formatDate } from '@/utils/Fechas'
// import { formatCurrency } from '@/utils/VerPrecio'
// import React, { useEffect, useState, useMemo } from 'react'
// import { BiTransfer } from "react-icons/bi";

// const MovementsPage = () => {
//     const { getMoves, moves } = useTransaction()
//     const [filterPeriod, setFilterPeriod] = useState('');
//     const [filterType, setFilterType] = useState('');
//     const [selectedButton, setSelectedButton] = useState(null);

//     useEffect(() => {
//         getMoves()
//     }, [])

//     const handleFilterPeriod = (period, index) => {
//         if (filterPeriod === period) {
//             setFilterPeriod('');
//             setSelectedButton(null);
//         } else {
//             setFilterPeriod(period);
//             setSelectedButton(index);
//         }
//     };

//     const handleFilterType = (e) => {
//         setFilterType(e.target.value);
//     };

//     const filteredMovements = useMemo(() => {
//         return moves.filter(mov => {
//             const now = new Date();
//             const movDate = new Date(mov.date);

//             let periodMatch = true;
//             switch (filterPeriod) {
//                 case 'hoy':
//                     periodMatch = movDate.toDateString() === now.toDateString();
//                     break;
//                 case 'ayer':
//                     const yesterday = new Date(now);
//                     yesterday.setDate(now.getDate() - 1);
//                     periodMatch = movDate.toDateString() === yesterday.toDateString();
//                     break;
//                 case 'última semana':
//                     const lastWeek = new Date(now);
//                     lastWeek.setDate(now.getDate() - 7);
//                     periodMatch = movDate >= lastWeek;
//                     break;
//                 case 'últimos 15 días':
//                     const last15Days = new Date(now);
//                     last15Days.setDate(now.getDate() - 15);
//                     periodMatch = movDate >= last15Days;
//                     break;
//                 case 'último mes':
//                     const lastMonth = new Date(now);
//                     lastMonth.setMonth(now.getMonth() - 1);
//                     periodMatch = movDate >= lastMonth;
//                     break;
//                 case 'últimos 3 meses':
//                     const last3Months = new Date(now);
//                     last3Months.setMonth(now.getMonth() - 3);
//                     periodMatch = movDate >= last3Months;
//                     break;
//                 default:
//                     break;
//             }

//             let typeMatch = true;
//             if (filterType) {
//                 if (filterType === 'Ingresos') {
//                     typeMatch = ['transfer_received', 'payment_received', 'deposit_completed'].includes(mov.type);
//                 } else if (filterType === 'Egresos') {
//                     typeMatch = ['transfer_sent', 'payment_sent'].includes(mov.type);
//                 }
//             }

//             return periodMatch && typeMatch;
//         });
//     }, [moves, filterPeriod, filterType]);

//     const [ buttonDate , setButtonDate ] = useState(false)
//     const handleButton = ( ) => {
//         setButtonDate(!buttonDate)
//     }

//     return (
//         <div>
//             <h2 className='text-center text-2xl font-semibold my-3'> Movimientos </h2>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 <input placeholder='Buscar movimiento'/>
//             </section>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 {['hoy', 'ayer', 'última semana', 'últimos 15 días', 'último mes', 'últimos 3 meses'].map((period, index) => (
//                     <h6
//                         key={index}
//                         className={`bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer ${selectedButton === index ? 'bg-blue-700' : ''}`}
//                         onClick={() => handleFilterPeriod(period, index)}
//                     >
//                         {period.charAt(0).toUpperCase() + period.slice(1)}
//                     </h6>
//                 ))}
//             </section>

//             <section className='flex flex-row gap-x-2 w-[90%] mx-auto justify-center mt-2'> 
//                 <select name="typeFilter" id="typeFilter" className='text-black' onChange={handleFilterType}>
//                     <option value="">Elije una opción</option>
//                     <option value="Ingresos">Ingresos</option>
//                     <option value="Egresos">Egresos</option>
//                 </select>

//                 <div onClick={handleButton} className={`flex flex-row items-center ${buttonDate ? "bg-greenlime text-lime-950" : "bg-gray-700 text-greenlime" } text-greenlime cursor-pointer border border-lime-500 py-1 px-3`} >
//                     <BiTransfer className={` text-2xl ${buttonDate ? "-rotate-90 text-lime-950" : "rotate-90" } transition-all duration-200`} />
//                     <h3> Más recientes </h3>
//                 </div>
//             </section>

//             <div className='w-full flex flex-row justify-center'>
//                 <input type="range" className='w-[80%] mx-auto my-4'/>
//             </div>

//             <section className='w-[90%] mx-auto flex flex-col gap-y-2 h-[600px] overflow-hidden overflow-y-scroll py-2 mt-4 relative pt-4'>
//                 {filteredMovements.map((movimiento, i) => (
//                     <article key={i} className='flex flex-row bg-slate-800 p-3 rounded-md justify-between items-center'>
//                         <div className='flex flex-row items-center gap-x-2'>
//                             <div className={`h-3 w-3 ${['deposit_completed', 'transfer_received', 'payment_received'].includes(movimiento.type) ? "bg-lime-500" : "bg-red-500"} rounded-full`} />
//                             <h6> {movimiento?.details}</h6>
//                         </div>
//                         <div className='flex flex-col'>
//                             <h6> {formatDate(movimiento?.date)}</h6>
//                             <h6> $ {formatCurrency(movimiento?.amount)}</h6>
//                         </div>
//                     </article>
//                 ))}
//             </section>
//         </div>
//     )
// }

// export default MovementsPage


// 'use client'
// import { useTransaction } from '@/context/TransContext'
// import { formatDate } from '@/utils/Fechas'
// import { formatCurrency } from '@/utils/VerPrecio'
// import React, { useEffect, useState, useMemo } from 'react'
// import { BiTransfer } from "react-icons/bi";

// const MovementsPage = () => {
//     const { getMoves, moves } = useTransaction()
//     const [filterPeriod, setFilterPeriod] = useState('');
//     const [filterType, setFilterType] = useState('');
//     const [selectedButton, setSelectedButton] = useState(null);
//     const [sortOrder, setSortOrder] = useState(null); // Estado para manejar el orden de los movimientos

//     useEffect(() => {
//         getMoves()
//     }, [])

//     const handleFilterPeriod = (period, index) => {
//         if (filterPeriod === period) {
//             setFilterPeriod('');
//             setSelectedButton(null);
//         } else {
//             setFilterPeriod(period);
//             setSelectedButton(index);
//         }
//     };

//     const handleFilterType = (e) => {
//         setFilterType(e.target.value);
//     };

//     const handleSortOrder = () => {
//         setSortOrder(prevSortOrder => prevSortOrder === 'desc' ? 'asc' : 'desc');
//     };

//     const filteredMovements = useMemo(() => {
//         let filtered = moves.filter(mov => {
//             const now = new Date();
//             const movDate = new Date(mov.date);

//             let periodMatch = true;
//             switch (filterPeriod) {
//                 case 'hoy':
//                     periodMatch = movDate.toDateString() === now.toDateString();
//                     break;
//                 case 'ayer':
//                     const yesterday = new Date(now);
//                     yesterday.setDate(now.getDate() - 1);
//                     periodMatch = movDate.toDateString() === yesterday.toDateString();
//                     break;
//                 case 'última semana':
//                     const lastWeek = new Date(now);
//                     lastWeek.setDate(now.getDate() - 7);
//                     periodMatch = movDate >= lastWeek;
//                     break;
//                 case 'últimos 15 días':
//                     const last15Days = new Date(now);
//                     last15Days.setDate(now.getDate() - 15);
//                     periodMatch = movDate >= last15Days;
//                     break;
//                 case 'último mes':
//                     const lastMonth = new Date(now);
//                     lastMonth.setMonth(now.getMonth() - 1);
//                     periodMatch = movDate >= lastMonth;
//                     break;
//                 case 'últimos 3 meses':
//                     const last3Months = new Date(now);
//                     last3Months.setMonth(now.getMonth() - 3);
//                     periodMatch = movDate >= last3Months;
//                     break;
//                 default:
//                     break;
//             }

//             let typeMatch = true;
//             if (filterType) {
//                 if (filterType === 'Ingresos') {
//                     typeMatch = ['transfer_received', 'payment_received', 'deposit_completed'].includes(mov.type);
//                 } else if (filterType === 'Egresos') {
//                     typeMatch = ['transfer_sent', 'payment_sent'].includes(mov.type);
//                 }
//             }

//             return periodMatch && typeMatch;
//         });

//         if (sortOrder) {
//             filtered = filtered.sort((a, b) => {
//                 const dateA = new Date(a.date);
//                 const dateB = new Date(b.date);
//                 return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
//             });
//         }

//         return filtered;
//     }, [moves, filterPeriod, filterType, sortOrder]);

//     return (
//         <div>
//             <h2 className='text-center text-2xl font-semibold my-3'> Movimientos </h2>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 <input placeholder='Buscar movimiento'/>
//             </section>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 {['hoy', 'ayer', 'última semana', 'últimos 15 días', 'último mes', 'últimos 3 meses'].map((period, index) => (
//                     <h6
//                         key={index}
//                         className={`bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer ${selectedButton === index ? 'bg-blue-700' : ''}`}
//                         onClick={() => handleFilterPeriod(period, index)}
//                     >
//                         {period.charAt(0).toUpperCase() + period.slice(1)}
//                     </h6>
//                 ))}
//             </section>

//             <section className='flex flex-row gap-x-2 w-[90%] mx-auto justify-center mt-2'> 
//                 <select name="typeFilter" id="typeFilter" className='text-black' onChange={handleFilterType}>
//                     <option value="">Elije una opción</option>
//                     <option value="Ingresos">Ingresos</option>
//                     <option value="Egresos">Egresos</option>
//                 </select>

//                 <div onClick={handleSortOrder} className={`flex flex-row items-center ${sortOrder ? "bg-greenlime text-lime-950" : "bg-gray-700 text-greenlime"} text-greenlime cursor-pointer border border-lime-500 py-1 px-3`}>
//                     <BiTransfer className={`text-2xl ${sortOrder === 'asc' ? "-rotate-90" : "rotate-90"} transition-all duration-200`} />
//                     <h3> Más recientes </h3>
//                 </div>
//             </section>

//             <div className='w-full flex flex-row justify-center'>
//                 <input type="range" className='w-[80%] mx-auto my-4'/>
//             </div>

//             <section className='w-[90%] mx-auto flex flex-col gap-y-2 h-[600px] overflow-hidden overflow-y-scroll py-2 mt-4 relative pt-4'>
//                 {filteredMovements.map((movimiento, i) => (
//                     <article key={i} className='flex flex-row bg-slate-800 p-3 rounded-md justify-between items-center'>
//                         <div className='flex flex-row items-center gap-x-2'>
//                             <div className={`h-3 w-3 ${['deposit_completed', 'transfer_received', 'payment_received'].includes(movimiento.type) ? "bg-lime-500" : "bg-red-500"} rounded-full`} />
//                             <h6> {movimiento?.details}</h6>
//                         </div>
//                         <div className='flex flex-col'>
//                             <h6> {formatDate(movimiento?.date)}</h6>
//                             <h6> $ {formatCurrency(movimiento?.amount)}</h6>
//                         </div>
//                     </article>
//                 ))}
//             </section>
//         </div>
//     )
// }

// export default MovementsPage


// 'use client'
// import { useTransaction } from '@/context/TransContext'
// import { formatDate } from '@/utils/Fechas'
// import { formatCurrency } from '@/utils/VerPrecio'
// import React, { useEffect, useState, useMemo } from 'react'
// import { BiTransfer } from "react-icons/bi";

// const MovementsPage = () => {
//     const { getMoves, moves } = useTransaction()
//     const [filterPeriod, setFilterPeriod] = useState('');
//     const [filterType, setFilterType] = useState('');
//     const [selectedButton, setSelectedButton] = useState(null);
//     const [sortOrder, setSortOrder] = useState(null); // Estado para manejar el orden de los movimientos
//     const [range, setRange] = useState(90000); // Estado para manejar el valor del rango

//     useEffect(() => {
//         getMoves()
//     }, [])

//     const handleFilterPeriod = (period, index) => {
//         if (filterPeriod === period) {
//             setFilterPeriod('');
//             setSelectedButton(null);
//         } else {
//             setFilterPeriod(period);
//             setSelectedButton(index);
//         }
//     };

//     const handleFilterType = (e) => {
//         setFilterType(e.target.value);
//     };

//     const handleSortOrder = () => {
//         setSortOrder(prevSortOrder => prevSortOrder === 'desc' ? 'asc' : 'desc');
//     };

//     const handleRangeChange = (e) => {
//         setRange(Number(e.target.value));
//     };

//     const filteredMovements = useMemo(() => {
//         let filtered = moves.filter(mov => {
//             const now = new Date();
//             const movDate = new Date(mov.date);

//             let periodMatch = true;
//             switch (filterPeriod) {
//                 case 'hoy':
//                     periodMatch = movDate.toDateString() === now.toDateString();
//                     break;
//                 case 'ayer':
//                     const yesterday = new Date(now);
//                     yesterday.setDate(now.getDate() - 1);
//                     periodMatch = movDate.toDateString() === yesterday.toDateString();
//                     break;
//                 case 'última semana':
//                     const lastWeek = new Date(now);
//                     lastWeek.setDate(now.getDate() - 7);
//                     periodMatch = movDate >= lastWeek;
//                     break;
//                 case 'últimos 15 días':
//                     const last15Days = new Date(now);
//                     last15Days.setDate(now.getDate() - 15);
//                     periodMatch = movDate >= last15Days;
//                     break;
//                 case 'último mes':
//                     const lastMonth = new Date(now);
//                     lastMonth.setMonth(now.getMonth() - 1);
//                     periodMatch = movDate >= lastMonth;
//                     break;
//                 case 'últimos 3 meses':
//                     const last3Months = new Date(now);
//                     last3Months.setMonth(now.getMonth() - 3);
//                     periodMatch = movDate >= last3Months;
//                     break;
//                 default:
//                     break;
//             }

//             let typeMatch = true;
//             if (filterType) {
//                 if (filterType === 'Ingresos') {
//                     typeMatch = ['transfer_received', 'payment_received', 'deposit_completed'].includes(mov.type);
//                 } else if (filterType === 'Egresos') {
//                     typeMatch = ['transfer_sent', 'payment_sent'].includes(mov.type);
//                 }
//             }

//             let rangeMatch = true;
//             if (range) {
//                 rangeMatch = mov.amount <= range;
//             }

//             return periodMatch && typeMatch && rangeMatch;
//         });

//         if (sortOrder) {
//             filtered = filtered.sort((a, b) => {
//                 const dateA = new Date(a.date);
//                 const dateB = new Date(b.date);
//                 return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
//             });
//         }

//         return filtered;
//     }, [moves, filterPeriod, filterType, sortOrder, range]);

//     return (
//         <div>
//             <h2 className='text-center text-2xl font-semibold my-3'> Movimientos </h2>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 <input placeholder='Buscar movimiento'/>
//             </section>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 {['hoy', 'ayer', 'última semana', 'últimos 15 días', 'último mes', 'últimos 3 meses'].map((period, index) => (
//                     <h6
//                         key={index}
//                         className={`bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer ${selectedButton === index ? 'bg-blue-700' : ''}`}
//                         onClick={() => handleFilterPeriod(period, index)}
//                     >
//                         {period.charAt(0).toUpperCase() + period.slice(1)}
//                     </h6>
//                 ))}
//             </section>

//             <section className='flex flex-row gap-x-2 w-[90%] mx-auto justify-center mt-2'> 
//                 <select name="typeFilter" id="typeFilter" className='text-black' onChange={handleFilterType}>
//                     <option value="">Elije una opción</option>
//                     <option value="Ingresos">Ingresos</option>
//                     <option value="Egresos">Egresos</option>
//                 </select>

//                 <div onClick={handleSortOrder} className={`flex flex-row items-center ${sortOrder ? "bg-greenlime text-lime-950" : "bg-gray-700 text-greenlime"} text-greenlime cursor-pointer border border-lime-500 py-1 px-3`}>
//                     <BiTransfer className={`text-2xl ${sortOrder === 'asc' ? "-rotate-90" : "rotate-90"} transition-all duration-200`} />
//                     <h3> Más recientes </h3>
//                 </div>
//             </section>

//             <div className='w-full flex flex-row justify-center'>
//                 <input 
//                     type="range" 
//                     min="0" 
//                     max="90000" 
//                     step="1000" 
//                     value={range} 
//                     onChange={handleRangeChange}
//                     className='w-[80%] mx-auto my-4'
//                 />
//                 <div className="text-white">{range}</div>
//             </div>

//             <section className='w-[90%] mx-auto flex flex-col gap-y-2 h-[600px] overflow-hidden overflow-y-scroll py-2 mt-4 relative pt-4'>
//                 {filteredMovements.map((movimiento, i) => (
//                     <article key={i} className='flex flex-row bg-slate-800 p-3 rounded-md justify-between items-center'>
//                         <div className='flex flex-row items-center gap-x-2'>
//                             <div className={`h-3 w-3 ${['deposit_completed', 'transfer_received', 'payment_received'].includes(movimiento.type) ? "bg-lime-500" : "bg-red-500"} rounded-full`} />
//                             <h6> {movimiento?.details}</h6>
//                         </div>
//                         <div className='flex flex-col'>
//                             <h6> {formatDate(movimiento?.date)}</h6>
//                             <h6> $ {formatCurrency(movimiento?.amount)}</h6>
//                         </div>
//                     </article>
//                 ))}
//             </section>
//         </div>
//     )
// }

// export default MovementsPage


// 'use client'
// import { useTransaction } from '@/context/TransContext'
// import { formatDate } from '@/utils/Fechas'
// import { formatCurrency } from '@/utils/VerPrecio'
// import React, { useEffect, useState, useMemo } from 'react'
// import { BiTransfer } from "react-icons/bi";
// import ReactPaginate from 'react-paginate';

// const MovementsPage = () => {
//     const { getMoves, moves } = useTransaction()
//     const [filterPeriod, setFilterPeriod] = useState('');
//     const [filterType, setFilterType] = useState('');
//     const [selectedButton, setSelectedButton] = useState(null);
//     const [sortOrder, setSortOrder] = useState(null); // Estado para manejar el orden de los movimientos
//     const [range, setRange] = useState(90000); // Estado para manejar el valor del rango
//     const [currentPage, setCurrentPage] = useState(0); // Estado para manejar la página actual
//     const itemsPerPage = 10; // Número de elementos por página

//     useEffect(() => {
//         getMoves()
//     }, [])

//     const handleFilterPeriod = (period, index) => {
//         if (filterPeriod === period) {
//             setFilterPeriod('');
//             setSelectedButton(null);
//         } else {
//             setFilterPeriod(period);
//             setSelectedButton(index);
//         }
//     };

//     const handleFilterType = (e) => {
//         setFilterType(e.target.value);
//     };

//     const handleSortOrder = () => {
//         setSortOrder(prevSortOrder => prevSortOrder === 'desc' ? 'asc' : 'desc');
//     };

//     const handleRangeChange = (e) => {
//         setRange(Number(e.target.value));
//     };

//     const handlePageClick = ({ selected }) => {
//         setCurrentPage(selected);
//     };

//     const filteredMovements = useMemo(() => {
//         let filtered = moves.filter(mov => {
//             const now = new Date();
//             const movDate = new Date(mov.date);

//             let periodMatch = true;
//             switch (filterPeriod) {
//                 case 'hoy':
//                     periodMatch = movDate.toDateString() === now.toDateString();
//                     break;
//                 case 'ayer':
//                     const yesterday = new Date(now);
//                     yesterday.setDate(now.getDate() - 1);
//                     periodMatch = movDate.toDateString() === yesterday.toDateString();
//                     break;
//                 case 'última semana':
//                     const lastWeek = new Date(now);
//                     lastWeek.setDate(now.getDate() - 7);
//                     periodMatch = movDate >= lastWeek;
//                     break;
//                 case 'últimos 15 días':
//                     const last15Days = new Date(now);
//                     last15Days.setDate(now.getDate() - 15);
//                     periodMatch = movDate >= last15Days;
//                     break;
//                 case 'último mes':
//                     const lastMonth = new Date(now);
//                     lastMonth.setMonth(now.getMonth() - 1);
//                     periodMatch = movDate >= lastMonth;
//                     break;
//                 case 'últimos 3 meses':
//                     const last3Months = new Date(now);
//                     last3Months.setMonth(now.getMonth() - 3);
//                     periodMatch = movDate >= last3Months;
//                     break;
//                 default:
//                     break;
//             }

//             let typeMatch = true;
//             if (filterType) {
//                 if (filterType === 'Ingresos') {
//                     typeMatch = ['transfer_received', 'payment_received', 'deposit_completed'].includes(mov.type);
//                 } else if (filterType === 'Egresos') {
//                     typeMatch = ['transfer_sent', 'payment_sent'].includes(mov.type);
//                 }
//             }

//             let rangeMatch = true;
//             if (range) {
//                 rangeMatch = mov.amount <= range;
//             }

//             return periodMatch && typeMatch && rangeMatch;
//         });

//         if (sortOrder) {
//             filtered = filtered.sort((a, b) => {
//                 const dateA = new Date(a.date);
//                 const dateB = new Date(b.date);
//                 return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
//             });
//         }

//         return filtered;
//     }, [moves, filterPeriod, filterType, sortOrder, range]);

//     // Paginación de movimientos
//     const paginatedMovements = useMemo(() => {
//         const startIndex = currentPage * itemsPerPage;
//         return filteredMovements.slice(startIndex, startIndex + itemsPerPage);
//     }, [filteredMovements, currentPage]);

//     return (
//         <div>
//             <h2 className='text-center text-2xl font-semibold my-3'> Movimientos </h2>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 <input placeholder='Buscar movimiento'/>
//             </section>

//             <section className='bg-blue-500 w-full flex flex-row flex-wrap justify-center gap-2 py-2'>
//                 {['hoy', 'ayer', 'última semana', 'últimos 15 días', 'último mes', 'últimos 3 meses'].map((period, index) => (
//                     <h6
//                         key={index}
//                         className={`bg-slate-700 text-white rounded-md w-[150px] text-center cursor-pointer ${selectedButton === index ? 'bg-blue-700' : ''}`}
//                         onClick={() => handleFilterPeriod(period, index)}
//                     >
//                         {period.charAt(0).toUpperCase() + period.slice(1)}
//                     </h6>
//                 ))}
//             </section>

//             <section className='flex flex-row gap-x-2 w-[90%] mx-auto justify-center mt-2'> 
//                 <select name="typeFilter" id="typeFilter" className='text-black' onChange={handleFilterType}>
//                     <option value="">Elije una opción</option>
//                     <option value="Ingresos">Ingresos</option>
//                     <option value="Egresos">Egresos</option>
//                 </select>

//                 <div onClick={handleSortOrder} className={`flex flex-row items-center ${sortOrder ? "bg-greenlime text-lime-950" : "bg-gray-700 text-greenlime"} text-greenlime cursor-pointer border border-lime-500 py-1 px-3`}>
//                     <BiTransfer className={`text-2xl ${sortOrder === 'asc' ? "-rotate-90" : "rotate-90"} transition-all duration-200`} />
//                     <h3> Más recientes </h3>
//                 </div>
//             </section>

//             <div className='w-full flex flex-row justify-center'>
//                 <input 
//                     type="range" 
//                     min="0" 
//                     max="90000" 
//                     step="1000" 
//                     value={range} 
//                     onChange={handleRangeChange}
//                     className='w-[80%] mx-auto my-4'
//                 />
//                 <div className="text-white">{range}</div>
//             </div>

//             <section className='w-[90%] mx-auto flex flex-col gap-y-2 h-[600px] overflow-hidden overflow-y-scroll py-2 mt-4 relative pt-4'>
//                 {paginatedMovements.map((movimiento, i) => (
//                     <article key={i} className='flex flex-row bg-slate-800 p-3 rounded-md justify-between items-center'>
//                         <div className='flex flex-row items-center gap-x-2'>
//                             <div className={`h-3 w-3 ${['deposit_completed', 'transfer_received', 'payment_received'].includes(movimiento.type) ? "bg-lime-500" : "bg-red-500"} rounded-full`} />
//                             <h6> {movimiento?.details}</h6>
//                         </div>
//                         <div className='flex flex-col'>
//                             <h6> {formatDate(movimiento?.date)}</h6>
//                             <h6> $ {formatCurrency(movimiento?.amount)}</h6>
//                         </div>
//                     </article>
//                 ))}
//             </section>

//             <div className='w-[90%] mx-auto flex flex-row justify-center mt-4'>
//                 <ReactPaginate
//                     previousLabel={'Anterior'}
//                     nextLabel={'Siguiente'}
//                     breakLabel={'...'}
//                     pageCount={Math.ceil(filteredMovements.length / itemsPerPage)}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={5}
//                     onPageChange={handlePageClick}
//                     containerClassName={'pagination'}
//                     activeClassName={'active'}
//                 />
//             </div>
//         </div>
//     )
// }

// export default MovementsPage


'use client'
import { useTransaction } from '@/context/TransContext'
import { formatDate } from '@/utils/Fechas'
import { formatCurrency } from '@/utils/VerPrecio'
import React, { useEffect, useState, useMemo } from 'react'
import { BiTransfer } from "react-icons/bi";
import ReactPaginate from 'react-paginate';

const MovementsPage = () => {
    const { getMoves, moves } = useTransaction();
    const [filterPeriod, setFilterPeriod] = useState('');
    const [filterType, setFilterType] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [buttonDate, setButtonDate] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [rangeValue, setRangeValue] = useState(90000);
    const itemsPerPage = 10;

    useEffect(() => {
        getMoves();
    }, []);

    const handleFilterPeriod = (period, index) => {
        if (filterPeriod === period) {
            setFilterPeriod('');
            setSelectedButton(null);
        } else {
            setFilterPeriod(period);
            setSelectedButton(index);
        }
    };

    const handleFilterType = (e) => {
        setFilterType(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const handleButton = () => {
        setButtonDate(!buttonDate);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleRangeChange = (e) => {
        setRangeValue(Number(e.target.value));
    };

    const filteredMovements = useMemo(() => {
        return moves
            .filter(mov => {
                const now = new Date();
                const movDate = new Date(mov.date);

                let periodMatch = true;
                switch (filterPeriod) {
                    case 'hoy':
                        periodMatch = movDate.toDateString() === now.toDateString();
                        break;
                    case 'ayer':
                        const yesterday = new Date(now);
                        yesterday.setDate(now.getDate() - 1);
                        periodMatch = movDate.toDateString() === yesterday.toDateString();
                        break;
                    case 'última semana':
                        const lastWeek = new Date(now);
                        lastWeek.setDate(now.getDate() - 7);
                        periodMatch = movDate >= lastWeek;
                        break;
                    case 'últimos 15 días':
                        const last15Days = new Date(now);
                        last15Days.setDate(now.getDate() - 15);
                        periodMatch = movDate >= last15Days;
                        break;
                    case 'último mes':
                        const lastMonth = new Date(now);
                        lastMonth.setMonth(now.getMonth() - 1);
                        periodMatch = movDate >= lastMonth;
                        break;
                    case 'últimos 3 meses':
                        const last3Months = new Date(now);
                        last3Months.setMonth(now.getMonth() - 3);
                        periodMatch = movDate >= last3Months;
                        break;
                    default:
                        break;
                }

                let typeMatch = true;
                if (filterType) {
                    if (filterType === 'Ingresos') {
                        typeMatch = ['transfer_received', 'payment_received', 'deposit_completed'].includes(mov.type);
                    } else if (filterType === 'Egresos') {
                        typeMatch = ['transfer_sent', 'payment_sent'].includes(mov.type);
                    }
                }

                let searchMatch = true;
                if (searchText) {
                    searchMatch = mov.details.toLowerCase().includes(searchText);
                }

                let rangeMatch = mov.amount <= rangeValue;

                return periodMatch && typeMatch && searchMatch && rangeMatch;
            })
            .sort((a, b) => {
                if (buttonDate) {
                    return new Date(b.date) - new Date(a.date); // Ordenar de más reciente a más antiguo
                }
                return new Date(a.date) - new Date(b.date); // Ordenar de más antiguo a más reciente
            });
    }, [moves, filterPeriod, filterType, searchText, buttonDate, rangeValue]);

    const paginatedMovements = useMemo(() => {
        const startIndex = currentPage * itemsPerPage;
        return filteredMovements.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredMovements, currentPage]);

    return (
        <div>
            <h2 className='text-center text-2xl font-semibold my-3'> Movimientos </h2>

            <section className='flex flex-row gap-2 py-2 w-full '>
                <input 
                    placeholder='Buscar movimiento'
                    onChange={handleSearchChange}
                    value={searchText}
                    className='p-2 rounded-md bg-slate-950 border border-gray-700 w-[80%] mx-auto'
                />
            </section>

            <section className=' w-[80%] mx-auto flex flex-row flex-wrap justify-center gap-2 py-2'>
                {['hoy', 'ayer', 'última semana', 'últimos 15 días', 'último mes', 'últimos 3 meses'].map((period, index) => (
                    <h6
                        key={index}
                        className={`text-greenlime  rounded-md w-[160px] text-center cursor-pointer ${selectedButton === index ? 'bg-greenlime text-lime-950' : 'bg-slate-950'} border border-greenlime py-1 transition-all duration-500`}
                        onClick={() => handleFilterPeriod(period, index)}
                    >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                    </h6>
                ))}
            </section>

            <section className='flex flex-row gap-x-2 w-[90%] mx-auto justify-center mt-2'> 
                <select name="typeFilter" id="typeFilter" className='bg-slate-900 text-greenlime p-2 outline-none' onChange={handleFilterType}>
                    <option value="">Elije una opción</option>
                    <option value="Ingresos">Ingresos</option>
                    <option value="Egresos">Egresos</option>
                </select>

                <div onClick={handleButton} className={`flex flex-row items-center rounded-lg gap-x-2 ${buttonDate ? "bg-slate-950 text-greenlime" : " bg-greenlime text-lime-950" } text-greenlime cursor-pointer border border-lime-500 py-1 px-3`} >
                    <BiTransfer className={` text-2xl ${buttonDate ? "-rotate-90 text-greenlime" : "rotate-90" } transition-all duration-200`} />
                    <h3> { buttonDate ? "Más recientes" : "Mas Antiguos"} </h3>
                </div>
            </section>

            <div className='w-full flex flex-col justify-center items-center'>
                <input 
                    type="range" 
                    min="0" 
                    max="90000" 
                    step="1000" 
                    value={rangeValue} 
                    onChange={handleRangeChange}
                    className='range w-[80%] mx-auto my-4 bg-red-500 '
                />
                <span className='text-greenlime text-lg'>{`Movimientos menores a  $${rangeValue}`}</span>
            </div>

            <section className='w-[90%] mx-auto flex flex-col gap-y-2 h-[600px] overflow-hidden overflow-y-scroll py-2 mt-4 relative pt-4'>
                {paginatedMovements.map((movimiento, i) => (
                    <article key={i} className='flex flex-row bg-slate-800 p-3 rounded-md justify-between items-center'>
                        <div className='flex flex-row items-center gap-x-2'>
                            <div className={`h-3 w-3 ${['deposit_completed', 'transfer_received', 'payment_received'].includes(movimiento.type) ? "bg-lime-500" : "bg-red-500"} rounded-full`} />
                            <h6> {movimiento?.details}</h6>
                        </div>
                        <div className='flex flex-col'>
                            <h6> {formatDate(movimiento?.date)}</h6>
                            <h6> $ {formatCurrency(movimiento?.amount)}</h6>
                        </div>
                    </article>
                ))}
            </section>

            <div className='w-[90%] mx-auto flex justify-center mt-4'>
                <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(filteredMovements.length / itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    disabledClassName={'disabled'}
                />
            </div>
        </div>
    )
}

export default MovementsPage;
