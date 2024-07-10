import { z } from "zod" ;

export const registerSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido"
    }),
    lastname: z.string({
        required_error: "El apellido es requerido"
    }),
    dni: z.number({
        required_error: "El apellido es requerido"
    }),
    email: z.string({
        required_error: "El email es requerido"
    }).email({
        message : "El email es invalido"
    }),
    password: z.string({
        required_error: "la contraseña es requerida"
    }).min(6 , {
        message: "La contraseña debe tener al menos 6 caracteres"
    }),
    rol: z.string(),
    dinero: z.number(),
    phone: z.number({
        required_error: "El numero de telefono es requerido"
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "El email es requerido"
    }).email({
        message : "El email es invalido"
    }),
    password: z.string({
        required_error: "la contraseña es requerida"
    }).min(6 , {
        message: "La contraseña debe tener al menos 6 caracteres"
    }) 
})