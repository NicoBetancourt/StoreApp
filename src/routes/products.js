import { Router } from 'express'
import Parser from 'body-parser'
var jsonParser = Parser.json()

// IMPORTAR MODELOS
import {Product} from '../models/products.js'
import { checkScope }  from '../middleware/auth.js'

const productRouter =  Router()
const base = '/products'

// CREATE MULTIPLE PRODUCTS
productRouter.post(`${base}`,jsonParser, checkScope('products:create',' can not create products'), async (req,res) => {
    try {
        await Product.insertMany(req.body)
        res.status(201).send(req.body)
    } catch (e) {
        res.status(400).send(e)
    }
})

// CREATE NEW PRODUCT
productRouter.post(`${base}`,jsonParser, checkScope('products:create',' can not create products'), async (req,res) => {
    const product = new Product(req.body)
    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})

// READ ALL PRODUCTS
productRouter.get(`${base}`, checkScope('products:read',' can not read products'),(req, res) => { 
    Product.find({}).then((products) => {
        res.send(products)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// READ ONE PRODUCT
productRouter.get(`${base}/:id`, checkScope('products:read',' can not read products'),async (req, res) => {
    const id_ = req.params.id
    try {
        const product = await Product.findById(id_)
        if (!product) {
            return res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        res.status(500).send(e)
    }
})

// DELETE PRODUCT
productRouter.delete(`${base}/:id`, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

export{productRouter}