import {Router} from 'express';
import {getSolicitud,getSolicitudes,createSolicitud,updateSolicitud,deleteSolicitud}from '../controllers/solicitudes.controllers.js'
const router = Router();

router.get('/solicitudes', getSolicitudes)
router.get('/solicitudes/:usuario', getSolicitud)

router.post('/solicitudes',createSolicitud )



router.put('/solicitudes/:id',updateSolicitud)

router.delete('/solicitudes/:usuario',deleteSolicitud)


export default router;