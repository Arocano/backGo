 
import { pool} from '../db.js'

export const getSolicitud= async (req,res) =>{
  try {
    const [taxista]=await pool.query('SELECT s.*,e.taxista_asignado,es.estado FROM solicitudes as s,estado_solicitudes as e,estados as es WHERE s.usuario=? AND s.id=e.id_solicitud AND e.estado=es.id',[req.params.usuario])
        
    if(taxista.length <= 0) return res.status(404).json({
        message:'No existe el taxista'
    })
    res.json(taxista[0]) 
  } catch (error) {
    return res.status(500).json({
        message:'Error del servidor'
    })
  }      
  
}


export const getSolicitudes= async (req,res) =>{
    try {
        const [solicitudes]=await pool.query('SELECT s.*,e.taxista_asignado,es.estado FROM solicitudes as s,estado_solicitudes as e,estados as es WHERE s.id=e.id_solicitud AND e.estado=es.id')
        
       
        res.json(solicitudes) 
    } catch (error) {
        return res.status(500).json({
            message:'Error del servidor'
        })
    }
    
}

export const createSolicitud =async (req,res) =>{
    const {usuario,calle_principal,calle_secundaria,referencia,barrio_sector,informacion_adicional} = req.body
    try {
        
        const [taxista]=await pool.query('INSERT INTO solicitudes (usuario,calle_principal,calle_secundaria,referencia,barrio_sector,informacion_adicional,ubicacion_actual) VALUES (?,?,?,?,?,?,"pendiente")',
        [usuario,calle_principal,calle_secundaria,referencia,barrio_sector,informacion_adicional])
        await pool.query('INSERT INTO  estado_solicitudes (id_solicitud,taxista_asignado,estado) VALUES (?,"pendiente",3)',[taxista.insertId])
        res.send({
            id:taxista.insertId, usuario,calle_principal,calle_secundaria,referencia,barrio_sector,informacion_adicional
        }) 
    } catch (er) {
        return res.status(500).json({
            error:er
        })
    }

}


export const updateSolicitud=async (req,res) =>{
    const {estado}=req.body
    try {
        const [result] =await pool.query('UPDATE estado_solicitudes SET estado=? WHERE id_solicitud=?',[estado,req.params.id])
        if(result.affectedRows===0)return res.status(404).json({
            message:'No existe la solicitud'
        })
        
        const [taxista] =await pool.query('SELECT s.*,e.taxista_asignado,es.estado FROM solicitudes as s,estado_solicitudes as e,estados as es WHERE s.id =? AND s.id=e.id_solicitud AND e.estado=es.id',[req.params.id])
        res.json(taxista[0])
    } catch (error) {
        return res.status(500).json({
            message:error
        })
    }


}
export const deleteSolicitud= async (req,res) =>{
  try {
      
    const [result] =await pool.query('DELETE FROM solicitudes WHERE id=?',[req.params.usuario])
    if(result.affectedRows <= 0) return res.status(404).json({
        message:'No existe la solicitud'
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
        message:'Error del servidor'
    })
  }
}