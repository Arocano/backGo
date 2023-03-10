import {Router} from 'express';
import {getSolicitud,getSolicitudes,createSolicitud,updateSolicitud,deleteSolicitud}from '../controllers/carrera.controllers.js'
const router = Router();

router.get('/carreras', getSolicitudes)
router.get('/carreras/:id', getSolicitud)

router.post('/carreras/:id',createSolicitud )



router.put('/carreras/:id',updateSolicitud)

router.delete('/carreras/:usuario',deleteSolicitud)


export default router;