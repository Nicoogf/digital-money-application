// import { model, models, Schema } from "mongoose";

// const UserSchema = new Schema({
//     name: {
//         type: String
//     },
//     lastname: {
//         type: String
//     },
//     email: {
//         type: String,
//         unique : [true , "El Email ya se encuentra Registrado"] 
//     },
//     dni: {
//         type: Number
//     },
//     rol: {
//         type: String,
//         default: "usuario"
//     },
//     dinero: {
//         type: Number,
//         default: 0
//     },
//     phone: {
//         type: Number
//     },
//     password: {
//         type: String
//     },
//     cbu: {
//         type: Number
//     },
//     alias: {
//         type: String
//     }
// }, {
//     timestamps: true
// })

// const User = models.User || model("User", UserSchema)
// export default User;


import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: function() { return this.rol === 'usuario'; }
    },
    lastname: {
        type: String,
        required: function() { return this.rol === 'usuario'; }
    },
    email: {
        type: String,
        unique: [true, "El Email ya se encuentra Registrado"],
        required: true
    },
    dni: {
        type: Number,
        required: function() { return this.rol === 'usuario'; }
    },
    rol: {
        type: String,
        enum: ['Usuario', 'Empresa'],
        default: 'Usuario'
    },
    dinero: {
        type: Number,
        default: 0
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cbu: {
        type: Number
    },
    alias: {
        type: String
    },
    companyName: {
        type: String,
        required: function() { return this.rol === 'empresa'; }
    },
    businessField: {
        type: String,
        required: function() { return this.rol === 'empresa'; }
    },
    cuit: {
        type: String,
        required: function() { return this.rol === 'empresa'; }
    }
}, {
    timestamps: true
});

const User = models.User || model("User", UserSchema);
export default User;