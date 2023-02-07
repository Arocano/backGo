import {Router} from 'express';
import {getViaje,getViajes,createViaje,updateViaje,deleteViaje}from '../controllers/viajes.controllers.js'
const router = Router();

router.get('/viajes', getViajes)
router.get('/viajes/:usuario', getViaje)

router.post('/viajes',createViaje )


router.put('/viajes/:id',updateViaje)

router.delete('/viaje/:usuario',deleteViaje)


export default router;