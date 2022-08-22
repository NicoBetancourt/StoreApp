import express from 'express'
import './db/mongoose.js'

// IMPORTAR RUTAS
import { usersRouter } from './routes/users.js'
import { roleRouter } from './routes/roles.js'
import { productRouter } from './routes/products.js'
import { saleRouter } from './routes/sales.js'


const app = express() // Framework
const port = process.env.PORT || 3000 // Puerto de coumnicación para enviar a heroku

app.use(usersRouter)
app.use(roleRouter)
app.use(productRouter)
app.use(saleRouter)

app.listen(port, () => {
    console.log('Server in port '+ port)
})