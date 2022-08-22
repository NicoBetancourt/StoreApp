import db from 'mongoose'

const productSchema = new db.Schema({
    // @ts-ignore
    name: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    price:{
        type: Number,
        require: true,
        trim: true,
    }
})
// VALIDACION PARA EL PRODUCTO
const Product = db.model('Product',productSchema)

export {Product}