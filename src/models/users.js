import db from 'mongoose'

const userSchema = new db.Schema({ // Crea la base de datos de nombre 'User'
    // @ts-ignore
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    document:{
        type: String,
        require: true,
        trim: true,
    },
    role:{
        type: String,
        require: true,
        // validate(value){
        //     // Modificar para que no sea estatico sino que lea al asignar rol cuales son los roles  y que se asigne uno existente
        //     if (!(value == '62f84b099e12f60efa0f4823' || value.toLowerCase() == '62f84b74b0dd6da2926a3335')){ 
        //         throw new Error ('Admin should have an existing role')
        //     }            
        // }
    }
})

// VALIDACION PARA EL USUARIO
const User = db.model('User',userSchema)

export { User }