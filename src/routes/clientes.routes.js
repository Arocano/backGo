import {Router} from 'express';
import {login,getCliente,getClientes,createClientes,updateClientes,deleteClientes}from '../controllers/clientes.controllers.js'
const router = Router();

router.get('/clientes', getClientes)
router.get('/clientes/:usuario', getCliente)

router.post('/clientes',createClientes )

router.post('/clientes/:usuario',login )

router.put('/clientes/:usuario',updateClientes)

router.delete('/clientes/:usuario',deleteClientes)


export default router;