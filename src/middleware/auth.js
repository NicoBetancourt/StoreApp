import { User } from '../models/users.js'
import { Role } from '../models/roles.js'

const checkScope = (keyAcces,comment) => {

    const auth = async (req,res,next) =>{
        try {
            // Trae el id del header
            const userId = req.header('Authorization')
            const user = await User.findById(userId)

            // Busca un usuario según el id
            if (!user) {
                throw new Error('Any user founded')
            }

            const RoleId = user.role
            // Busca el rol y permisos del Usuario
            const role = await Role.findById(RoleId)

            if (!role) {
                throw new Error(user.name + ' does not have an existing role')
            }
            
            const acces = await role.scope.includes( keyAcces )
            if (!acces) {
                return res.status(400).send({error: user.name + comment})
            }

            next()

        } catch (e) {
            res.status(401).send({e: 'id invalid'})
        }
    }
    return auth
}

export { checkScope }