import { Router } from 'express'
import { Product } from '../models/products.js'
import { User } from '../models/users.js'
import Parser from 'body-parser'
var jsonParser = Parser.json()

// IMPORTAR MODELOS
import { Sale } from '../models/sales.js'
import { checkScope }  from '../middleware/auth.js'
import { DateTime } from 'luxon'

const saleRouter =  Router()
const base = '/sales'

// CREATE NEW ITEM
saleRouter.post(`${base}`,jsonParser,checkScope('sale:create',' can not create sale'), async (req,res) => {

    const sale = new Sale(req.body)
    // VERIFY USER_ID AND PRODUCT_ID
    const user = await User.findById(sale.user_id)
    const product = await Product.findById(sale.product_id)

    if (!user) {
        return res.status(404).send('User id for the new sale is not exist')
    } else if (!product){
        return res.status(404).send('Product id for the new sale is not exist')
    }

    try {
        await sale.save()
        res.status(201).send(sale)
    } catch (e) {
        res.status(400).send(e)
    }
})

// READ ALL ITEMS
saleRouter.get(`${base}`,checkScope('sale:read',' can not read the sales'),(req, res) => {
    Sale.find({}).then((sales) => {
        res.send(sales)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// READ ONE ITEM
saleRouter.get(`${base}/:id`,checkScope('sale:read',' can not read the sales'),async (req, res) => {
    const id_ = req.params.id
    try {
        const sale = await Sale.findById(id_)
        if (!sale) {
            return res.status(404).send()
        }
        res.send(sale)
    } catch (e) {
        res.status(500).send(e)
    }
})

// UPDATE ITEM
saleRouter.patch(`${base}/:id`,jsonParser,checkScope('sale:update',' can not update the sales'), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['product_id','user_id','quantity','time']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const sale = await Sale.findByIdAndUpdate(req.params.id,req.body,{new:true,runValiadtors:true})
        if (!sale) {
            return res.status(404).send()
        }
        res.send(sale)
    } catch (e) {
        res.status(500).send(e)
    }
})

// DELETE ITEM
saleRouter.delete(`${base}/:id`,checkScope('sale:delete',' can not delete any sale'), async (req, res) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id)

        if (!sale) {
            return res.status(404).send()
        }

        res.send(sale)
    } catch (e) {
        res.status(500).send()
    }
})

// DAILY SALES
saleRouter.get(`${base}/reports/daily/:time`,checkScope('sale:count',' can not count the sales'),async (req, res) => {
    
    const date = DateTime.fromISO(req.params.time)
    const sale = await Sale.find()

    const daily = sale.filter(item => {
        return date.hasSame(item.time,'day')
    })

    const sumary = async (arr) => {
        var arrayProducts = {}, results = [], prod_id;
        for (var i = 0; i < arr.length; i++) {
            prod_id = arr[i].product_id;
            if (!(prod_id in arrayProducts)) {
                arrayProducts[prod_id] = 0;
            }
            arrayProducts[prod_id] += arr[i].quantity;
        }
    
        for(prod_id in arrayProducts) {
            var product = await Product.findById(prod_id)
            var totalPrice = product.price * arrayProducts[prod_id]
            results.push({ product_id: prod_id, quantity: arrayProducts[prod_id], totalAmount:totalPrice});
        }
    
        return results;
    }

    // sumary(daily).then(val => res.status(201).send(val))

    try {
        const results = sumary(daily)
        res.status(201).send(results)
    } catch (error) {

    }
    
})

// MONTHLY SALES
saleRouter.get(`${base}/reports/monthly/:time`,checkScope('sale:read',' can not read the sales'),async(req, res) => {
    const date = DateTime.fromISO(req.params.time)
    const sale = await Sale.find()

    const daily = sale.filter(item => {
        return date.hasSame(item.time,'month')
    })

    const sumary = async (arr) => {
        var arrayProducts = {}, results = [], prod_id;
        for (var i = 0; i < arr.length; i++) {
            prod_id = arr[i].product_id;
            if (!(prod_id in arrayProducts)) {
                arrayProducts[prod_id] = 0;
            }
            arrayProducts[prod_id] += arr[i].quantity;
        }
    
        for(prod_id in arrayProducts) {
            var product = await Product.findById(prod_id)
            var totalPrice = product.price * arrayProducts[prod_id]
            results.push({ product_id: prod_id, quantity: arrayProducts[prod_id], totalAmount:totalPrice});
        }
    
        return results;
    }

    sumary(daily).then(val => res.send(val))
})


export{saleRouter}