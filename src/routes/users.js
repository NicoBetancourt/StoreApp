import { Router } from 'express'
import { Role } from '../models/roles.js'
import Parser from 'body-parser'
var jsonParser = Parser.json()

// IMPORTAR MODELOS
import { User } from '../models/users.js'
import { checkScope }  from '../middleware/auth.js'

const usersRouter =  Router()
const base = '/users'

// CREATE NEW USER
usersRouter.post(`${base}`,jsonParser, checkScope('users:create',' can not create users'), async (req,res) => {

    // READ ROLES
    const roles = await Role.find({})
    if (!roles) {
        return res.status(404).send()
    }
    //TODO Mejorar esta busqueda como se hizo en sales por id
    var rolesId = []
    for (var i=0;i<roles.length;i++){
        rolesId[i] = roles[i]._id.toString()
    }
    
    const user = new User(req.body)
    //VERIFY IF ROLE ID EXIST IN THE DATABASE
    if (!rolesId.includes(user.role.toString())){
        return res.status(404).send('Role id for the new user is not exist')
    }

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// READ ALL USERS
usersRouter.get(`${base}`, jsonParser , checkScope('users:read',' can not read the existing users') ,async (req, res) => { 
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

// READ ONE USER
usersRouter.get(`${base}/:id`, checkScope('users:read',' can not read the existing users'),async (req, res) => {
    const id_ = req.params.id
    try {
        const user = await User.findById(id_)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// UPDATE USER
usersRouter.patch(`${base}/:id`,jsonParser, checkScope('users:update',' can not update users'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','lastName','document','role']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValiadtors:true})
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// DELETE USER
usersRouter.delete(`${base}/:id`, checkScope('users:delete',' can not delete users'), async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

export{usersRouter}