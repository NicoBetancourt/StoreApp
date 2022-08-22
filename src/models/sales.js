import db from 'mongoose'

// VALIDACION PARA LA VENTA
const Sale = db.model('Sales',{
    // @ts-ignore
    product_id: {
        type: String,
        required: true,
        trim: true
    },
    user_id:{
        type: String,
        required: true,
        trim: true,
    },
    quantity:{
        type: Number,
        require: true,
        trim: true,
    },
    time:{
        type: Date,
        default: Date.now
    }
})

export {Sale}