import cors from 'cors'
import express from 'express'
import taxistas from './routes/taxistas.routes.js'
import index from './routes/index.routes.js'
import clientes from './routes/clientes.routes.js'
import solicitudes from './routes/solicitudes.routes.js'
import control from './routes/control.routes.js'

const app = express()
app.use(cors());
app.use(express.json())
app.use('/api',taxistas )
app.use('/api',index)
app.use('/api',clientes )
app.use('/api',solicitudes )
app.use('/api',control )

app.use((req,res,next)=>{
    res.status(404).json({
        message:'No encontrado'
    })
})
export default app;