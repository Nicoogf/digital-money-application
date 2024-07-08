import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    dni: {
        type: Number
    },
    rol: {
        type: String,
        default: "usuario"
    },
    dinero: {
        type: Number,
        default: 0
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    cbu: {
        type: Number
    },
    alias: {
        type: String
    }
}, {
    timestamps: true
})

const User = models.User || model("User", UserSchema)
export default User;