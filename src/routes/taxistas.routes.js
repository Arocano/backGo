import {Router} from 'express';
import {login,getTaxista,getTaxistas,createTaxistas,updateTaxista,deleteTaxista}from '../controllers/taxistas.controllers.js'
const router = Router();

router.get('/taxistas', getTaxistas)
router.get('/taxistas/:usuario', getTaxista)

router.post('/taxistas',createTaxistas )

router.post('/taxistas/:usuario',login )

router.put('/taxistas/:usuario',updateTaxista)

router.delete('/taxistas/:usuario',deleteTaxista)


export default router;