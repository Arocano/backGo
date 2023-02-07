import {Router} from 'express';
import {getSolicitud,getSolicitudes,createSolicitud,updateSolicitud,deleteSolicitud}from '../controllers/solicitudes.controllers.js'
const router = Router();

router.get('/carreras', getSolicitudes)
router.get('/carreras/:taxista', getSolicitud)

router.post('/carreras/:id',createSolicitud )



router.put('/carreras/:id',updateSolicitud)

router.delete('/carreras/:usuario',deleteSolicitud)


export default router;