import {Router} from 'express';
import {getControles, getControl,createControl,updateControl,deleteControl}from '../controllers/control.controllers.js'
const router = Router();

router.get('/control', getControles)
router.get('/control/:id', getControl)

router.post('/control',createControl)

router.put('/control/:id',updateControl)

router.delete('/control/:usuario',deleteControl)


export default router;