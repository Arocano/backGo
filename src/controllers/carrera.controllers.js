import { pool} from '../db.js'

export const getSolicitud= async (req,res) =>{
    try {
        const [result] =await pool.query('UPDATE estado_solicitudes SET estado=6  WHERE id_solicitud=?',[req.params.id])
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


export const getSolicitudes= async (req,res) =>{
    try {
        const [solicitudes]=await pool.query('SELECT s.*,e.taxista_asignado,es.estado FROM solicitudes as s,estado_solicitudes as e,estados as es WHERE s.id=e.id_solicitud AND e.estado=es.id And es.estado="pendiente"')
        res.json(solicitudes) 
    } catch (error) {
        return res.status(500).json({
            message:'Error del servidor'
        })
    }
    
}

export const createSolicitud =async (req,res) =>{
    
    try {
        const [result] =await pool.query('UPDATE estado_solicitudes SET estado=1  WHERE id_solicitud=?',[req.params.id])
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


export const updateSolicitud=async (req,res) =>{

    try {
        const [result] =await pool.query('UPDATE estado_solicitudes SET estado=2  WHERE id_solicitud=?',[req.params.id])
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