 
import { pool} from '../db.js'

export const getSolicitud= async (req,res) =>{
  try {
    const [taxista]=await pool.query('SELECT * FROM solicitudes WHERE usuario=?',[req.params.usuario])
        
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
        const [taxistas]=await pool.query('SELECT * FROM solicitudes')
        res.json(taxistas) 
    } catch (error) {
        return res.status(500).json({
            message:'Error del servidor'
        })
    }
    
}

export const createSolicitud =async (req,res) =>{
    const {usuario,calle_principal,calle_secundaria,referencia,barrio_sector,informacion_adicional} = req.body
    try {
        
        const [taxista]=await pool.query('INSERT INTO solicitudes (usuario,calle_principal,calle_secundaria,referencia,barrio_sector,informacion_adicional) VALUES (?,?,?,?,?,?)',
        [usuario,calle_principal,calle_secundaria,referencia,barrio_sector,informacion_adicional])
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
    const {usuario}=req.params
    try {
        const [result] =await pool.query('UPDATE solicitudes SET estado=? WHERE id=?',[estado,usuario])
        if(result.affectedRows===0)return res.status(404).json({
            message:'No existe la solicitud'
        })
    
        const [taxista] =await pool.query('SELECT * FROM solicitudes WHERE usuario=?',[usuario])
        res.json(taxista[0])
    } catch (error) {
        return res.status(500).json({
            message:'Error del servidor'
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