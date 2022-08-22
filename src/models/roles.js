import db from 'mongoose'
import validator from 'validator'

// VALIDACION PARA EL USUARIO
const roleSchema = new db.Schema({
    // @ts-ignore
    name: {
        type: String,
        required: true,
        trim: true
    },
    scope:{
        type: Array,
        required: true,
        validate(value){
            const dataAdmin = [
                "sale:create",
                "sale:update",
                "sale:delete",
                "sale:read",
                "sale:count",
                "products:create",
                "products:read",
                "users:create",
                "users:read",
                "users:delete",
                "role:update",
                "role:create"]
                
            const validation = value.every(val => dataAdmin.includes(val))
            if (!validation){
                throw new Error ('Scope should have the next structure: ' + dataAdmin)
            }            
        }
        
    },
    
})

const Role = db.model('Role',roleSchema)

export { Role }