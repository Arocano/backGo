
import { pool} from '../db.js'

export const getTaxista= async (req,res) =>{
  try {
    const [taxista]=await pool.query('SELECT * FROM taxistas WHERE usuario=?',[req.params.usuario])
        
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


export const getTaxistas= async (req,res) =>{
    try {
        const [taxistas]=await pool.query('SELECT * FROM taxistas')
        res.json(taxistas) 
    } catch (error) {
        return res.status(500).json({
            message:'Error del servidor'
        })
    }
    
}

export const createTaxistas=async (req,res) =>{
    const {usuario,contrasenia,nombre,apellido,cooperativa} = req.body
    try {
        
        const [taxista]=await pool.query('INSERT INTO taxistas(usuario,contrasenia,nombre,apellido,cooperativa,estado) VALUES (?,?,?,?,?,"disponible")',
        [usuario,contrasenia,nombre,apellido,cooperativa])
        res.send({
            usuario,contrasenia,nombre,apellido,cooperativa,estado:'disponible'
        }) 
    } catch (er) {
        return res.status(500).json({
            error:'no se pudo crear el taxista'
        })
    }

}

export const updateTaxista=async (req,res) =>{
    const {estado}=req.body
    const {usuario}=req.params
    try {
        const [result] =await pool.query('UPDATE taxistas SET estado=? WHERE usuario=?',[estado,usuario])
        if(result.affectedRows===0)return res.status(404).json({
            message:'No existe el taxista'
        })
    
        const [taxista] =await pool.query('SELECT * FROM taxistas WHERE usuario=?',[usuario])
        res.json(taxista[0])
    } catch (error) {
        return res.status(500).json({
            message:'Error del servidor'
        })
    }


}
export const deleteTaxista= async (req,res) =>{
  try {
      
    const [result] =await pool.query('DELETE FROM taxistas WHERE usuario=?',[req.params.usuario])
    if(result.affectedRows <= 0) return res.status(404).json({
        message:'No existe el taxista'
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
        message:'Error del servidor'
    })
  }
}