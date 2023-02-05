import express from 'express'
import taxistas from './routes/taxistas.routes.js'
import index from './routes/index.routes.js'
import clientes from './routes/clientes.routes.js'

const app = express()

app.use(express.json())
app.use('/api',taxistas )
app.use('/api',index)
app.use('/api',clientes )
app.use((req,res,next)=>{
    res.status(404).json({
        message:'No encontrado'
    })
})
export default app;