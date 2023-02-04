import {Router} from 'express';
import {getTaxista,getTaxistas,createTaxistas,updateTaxista,deleteTaxista}from '../controllers/taxistas.controllers.js'
const router = Router();

router.get('/taxistas', getTaxistas)
router.get('/taxistas/:usuario', getTaxista)

router.post('/taxistas',createTaxistas )

router.put('/taxistas/:usuario',updateTaxista)

router.delete('/taxistas/:usuario',deleteTaxista)


export default router;