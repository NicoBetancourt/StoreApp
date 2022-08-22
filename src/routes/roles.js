import { Router } from 'express'
import Parser from 'body-parser'
var jsonParser = Parser.json()

// IMPORTAR MODELOS
import { Role } from '../models/roles.js'
import { checkScope }  from '../middleware/auth.js'

const roleRouter =  Router()
const base = '/roles'

// CREATE NEW ITEM
roleRouter.post(`${base}`,jsonParser,checkScope('role:create',' can not create roles'), async (req,res) => {
    const role = new Role(req.body)
    try {
        await role.save()
        res.status(201).send(role)
    } catch (e) {
        res.status(400).send(e)
    }
})

// READ ALL ITEMS
roleRouter.get(`${base}`,(req, res) => { 
    Role.find({}).then((roles) => {
        res.send(roles)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// READ ONE ITEM
roleRouter.get(`${base}/:id`,async (req, res) => {
    const id_ = req.params.id
    try {
        const role = await Role.findById(id_)
        if (!role) {
            return res.status(404).send()
        }
        res.send(role)
    } catch (e) {
        res.status(500).send(e)
    }
})

// DELETE ITEM
roleRouter.delete(`${base}/:id`, async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id)

        if (!role) {
            return res.status(404).send()
        }

        res.send(role)
    } catch (e) {
        res.status(500).send()
    }
})

// UPDATE USER
roleRouter.patch(`${base}/:id`,jsonParser,checkScope('role:update',' can not update roles'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','scope']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const role = await Role.findByIdAndUpdate(req.params.id,req.body,{new:true,runValiadtors:false})
        if (!role) {
            return res.status(404).send()
        }
        res.send(role)
    } catch (e) {
        res.status(500).send(e)
    }
})

export{roleRouter}